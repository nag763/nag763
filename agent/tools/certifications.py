"""
This module provides a tool to retrieve information about Loïc's certifications.
"""

from strands import tool

certifications = [
    {
        "title": "AWS Certified Data Engineer - Associate",
        "earned_on": "10/10/2025",
        "link": "https://www.credly.com/badges/6d39c7dd-fd8b-4cf5-8a4f-670b95d7547b/public_url",
        "detail": (
            "Validates technical expertise in data engineering on AWS, including designing and "
            "maintaining data solutions for ingestion, transformation, and delivery of data."
        ),
        "level": "Associate",
        "authority": "Amazon Web Services (AWS)",
    },
    {
        "title": "Azure Administrator Associate",
        "earned_on": "19/09/2025",
        "link": "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/645001C96C304EBF?sharingId=607BD74E791FA26E",
        "detail": (
            "Validates skills in implementing, managing, and monitoring identity, governance, "
            "storage, compute, and virtual networks in a cloud environment, plus provision, "
            "size, monitor, and adjust resources when needed."
        ),
        "level": "Associate",
        "authority": "Microsoft",
    },
    {
        "title": "AWS Certified AI Practitioner",
        "earned_on": "10/07/2025",
        "link": "https://www.credly.com/badges/95335a26-2d27-4718-9cde-a0f60a14c133/public_url",
        "detail": (
            "Validates foundational knowledge of AI concepts and terminology, as well as "
            "core AWS AI and machine learning services."
        ),
        "level": "Practitioner",
        "authority": "Amazon Web Services (AWS)",
    },
    {
        "title": "AWS Certified Developer – Associate",
        "earned_on": "16/05/2025",
        "link": "https://www.credly.com/badges/46c816db-1a9d-4c76-a180-30e4d51af1f6/public_url",
        "detail": (
            "Validates proficiency in developing, deploying, and debugging cloud-based "
            "applications using AWS. Covers core AWS services, best practices, and "
            "application lifecycle management."
        ),
        "level": "Associate",
        "authority": "Amazon Web Services (AWS)",
    },
    {
        "title": "AWS Certified Solutions Architect – Associate",
        "earned_on": "06/05/2025",
        "link": "https://www.credly.com/badges/37b9934f-c455-4c77-b975-df33c61d4c5d/public_url",
        "detail": (
            "Demonstrates ability to design distributed systems on AWS that are scalable, "
            "resilient, cost-efficient, and secure. Covers architectural best practices "
            "and AWS services."
        ),
        "level": "Associate",
        "authority": "Amazon Web Services (AWS)",
    },
    {
        "title": "AWS Certified Cloud Practitioner",
        "earned_on": "02/04/2025",
        "link": "https://www.credly.com/badges/4420a690-8cba-48ad-bd4a-f20b12d44491/public_url",
        "detail": (
            "Validates foundational knowledge of AWS Cloud concepts, core services, "
            "security, architecture, pricing, and support."
        ),
        "level": "Foundational",
        "authority": "Amazon Web Services (AWS)",
    },
    {
        "title": "Terraform Associate (003)",
        "earned_on": "21/03/2025",
        "link": "https://www.credly.com/badges/06d18ae9-4e80-47d5-bf49-d8582fdacc39/public_url",
        "detail": (
            "Validates understanding of infrastructure as code concepts, Terraform's "
            "workflow, and the ability to use Terraform for provisioning and managing "
            "cloud resources."
        ),
        "level": "Associate",
        "authority": "HashiCorp",
    },
    {
        "title": "SC-900 : Security, Compliance, and Identity Fundamentals",
        "earned_on": "05/03/2025",
        "link": "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/D3D2E5191ECE725A?sharingId=607BD74E791FA26E",
        "detail": (
            "Covers foundational knowledge of security, compliance, and identity concepts "
            "and related Microsoft solutions."
        ),
        "level": "Fundamental",
        "authority": "Microsoft",
    },
    {
        "title": "AI-900 : Azure AI Fundamentals",
        "earned_on": "28/02/2025",
        "link": "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/4D546F07B9FC2D16?sharingId=607BD74E791FA26E",
        "detail": (
            "Demonstrates foundational knowledge of artificial intelligence (AI) and "
            "machine learning (ML) concepts and related Azure services."
        ),
        "level": "Fundamental",
        "authority": "Microsoft",
    },
    {
        "title": "AZ-900 : Azure Fundamentals",
        "earned_on": "23/02/2025",
        "link": "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/485804E946B9FB1D?sharingId=607BD74E791FA26E",
        "detail": (
            "Validates foundational knowledge of cloud services and how those services "
            "are provided with Microsoft Azure."
        ),
        "level": "Fundamental",
        "authority": "Microsoft",
    },
]


@tool
def get_certifications() -> dict:
    """Helps retrieving information about Loïc's certifications.

    Returns:
        dict:
            status (str): The status of the request.
            certifications (list): List of certification information.

    """
    print("Certifications tool called")
    return {"status": "success", "certifications": certifications}
