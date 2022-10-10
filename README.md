```rust
struct Profile {
  pub firstname: String,
  pub age: u8,
  pub from: String,
  pub favorite_languages : Vec<String>,
  pub speaks: Vec<String>,
  pub is_active: bool,
  pub contact: String,
}

let me = Profile {
  firstname : "Loïc",
  age: 24,
  from: "Paris 🗼, France🇫🇷".into(),
  favorite_languages: vec!["Rust 🦀".into(), "Java ☕".into(), "Python 🐍".into(), "Javascript".into()],
  speaks: vec!["French 🇫🇷".into(), "English 🏴󠁧󠁢󠁥󠁮󠁧󠁿".into(), "German 🇩🇪".into()],
  is_active: true,
  contact: "loic.labeye@tutanota.de"
  
};
```

I just enjoy doing IT projects on my spare time, whatever the topic is. I try to make them open-source and deliver quality code that can be used by other developers, the way I sometimes inspire myself from existing projects.

I mostly work with Java and Javascript in my professional environment, however I prefer working with Rust in my spare time, hence why my profile mostly contains Rust projects.

Check out my most complete and best documented projects if you have some time :blush: :

* [tchatche.rs](https://github.com/nag763/tchatchers) : A chat web application based on axum, yew.rs, tailwind, nginx, postgres and redis.
* [doteur](https://github.com/nag763/doteur) : A database schema renderer, based in Rust.
* [rat-rs](https://github.com/nag763/rat-rs) : A lightweight yet powerful CLI schedule fetcher for IDF (Paris region) common transportation.
* [mptvfr](https://github.com/nag763/mptvfr) : An android application written on Dart with purpose to get the TV schedule without any - annoying - ads.
