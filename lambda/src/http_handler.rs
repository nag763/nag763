use aws_config::meta::region::RegionProviderChain;
use aws_sdk_sesv2::{
    config::Region, types::{Content, Destination, EmailContent, Message}, Client
};
use lambda_http::{Body, Error, Request, Response};

#[derive(serde::Deserialize)]
struct Email {
    from: String,
    topic: String,
    body: String,
}

/// This is the main body for the function.
/// Write your code inside it.
/// There are some code example in the following URLs:
/// - https://github.com/awslabs/aws-lambda-rust-runtime/tree/main/examples
pub(crate) async fn function_handler(event: Request) -> Result<Response<Body>, Error> {
    // Extract some useful information from the request
    let request_body = event.body().as_ref().to_vec();

    if request_body.is_empty() {
        return Ok(Response::builder()
            .status(400)
            .body("Request body is empty".into())
            .map_err(Box::new)?);
    }
    let email_event: Email = serde_json::from_slice(&request_body)?;

    let mut dest: Destination = Destination::builder().build();
    dest.to_addresses = Some(vec![std::env::var("MAIL_TO")?.to_string()]);
    let subject_content = Content::builder()
        .data(format!("{} - {}", email_event.topic, email_event.from))
        .charset("UTF-8")
        .build()?;

    let body_content = Content::builder()
        .data(format!(
            "Hello {}\n---this is an AWS Lambda HTTP request",
            email_event.body
        ))
        .charset("UTF-8")
        .build()?;

    let body = aws_sdk_sesv2::types::Body::builder()
        .text(body_content)
        .build();
    let msg = Message::builder()
        .subject(subject_content)
        .body(body)
        .build();

    let email_content = EmailContent::builder().simple(msg).build();

    let region_provider = RegionProviderChain::first_try(std::env::var("REGION").map(Region::new)?)
        .or_default_provider()
        .or_else(Region::new("eu-central-1"));


    let shared_config = aws_config::from_env().region(region_provider).load().await;
    Client::new(&shared_config)
        .send_email()
        .from_email_address(std::env::var("MAIL_SENDER")?.to_string())
        .destination(dest)
        .content(email_content)
        .send()
        .await?;

    let resp = Response::builder().status(200).body(Body::Empty).map_err(Box::new)?;
    Ok(resp)
}