import React from "react";
import "./Homepage.css";

function Homepage() {
  return (
    <div>
      <div className="Header">
        <div className="HeaderTextSection">
          <h3>Everyone Eats</h3>
          <br></br>
          <h1>Serving the Community</h1>
          <br></br>
          <p>
            Established in 2023. The aim is to end food hunger, achieve food
            security, improve nutrition, and promote sustainable agriculture by
            providing alternative ways for people to improve the food donation
            process
          </p>
        </div>

        <div>
          <img
            src={require("./Giving food.jpg")}
            alt="HelpingPhoto.png"
            id="borderimg1"
            // display="block" margin-left= "auto" margin-right= "auto"
          />
          {/* <img src={require("./photo/HeaderPhoto1.png")} alt="HelpingPhoto.png" 
                    display="block" margin-left= "auto" margin-right= "auto"   />*/}
        </div>
        {/* <img src={require("./photo/HeaderPhoto.png")} alt="HeaderPhoto.png" width={'1688px'}/> */}
      </div>
      <br></br>
      <div className="Information">
        <div className="InformationBox">
          <h2>Our Vision</h2>
          <br></br>
          <p>
            Our vision is to build a platform that eradicates food waste,
            promotes sustainable living, and ensures that every person,
            regardless of circumstance, has access to nourishing meals.
          </p>
        </div>
        <div className="InformationBox">
          <h2>Our Slogan</h2>
          <br></br>
          <p>"We are not getting younger. Today, let's fight hunger"</p>
        </div>
        <div className="InformationBox">
          <h2>Our Motto</h2>
          <br></br>
          <p>
            Our web application is not just about donating food, it's about
            transforming lives. Together, let's turn surplus into sustenance and
            make hunger a thing of the past.
          </p>
        </div>
      </div>

      <br></br>

      <div className="Footer">
        <h3>Contact Us</h3>
        <i class="fas fa-map-marker-alt pr-2"></i>
        <p> Footer Section</p>
        {/* <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p> */}
      </div>
    </div>
  );
  {
    /*
        (
            <div>
                <head>
            <title>W3.CSS Template</title>
            <meta charSet="UTF-8" />
            <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
            />
            <link
            rel="stylesheet"
            href="https://www.w3schools.com/w3css/4/w3.css"
            />
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato"
            />
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Montserrat"
            />
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <style>
            {`
                body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}
                .w3-bar,h1,button {font-family: "Montserrat", sans-serif}
                .fa-anchor,.fa-coffee {font-size:200px}
            `}
            </style>
        </head>
        <body>
                <div className="w3-top">
    <div className="w3-bar w3-red w3-card w3-left-align w3-large">
        <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onClick="myFunction()" title="Toggle Navigation Menu"><i className="fa fa-bars"></i></a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large w3-white">Home</a>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 1</a>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 2</a>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 3</a>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 4</a>
    </div>

    {/* <!-- Navbar on small screens --> 
    <div id="navDemo" className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 4</a>
    </div>
    </div>

    {/* <!-- Header --> 
    <header className="w3-container w3-red w3-center" style={{padding:'128px 16px', background: 'white'}}>
    <h1 className="w3-margin w3-jumbo">Everyone Eats</h1>
    <p className="w3-xlarge">Template by w3.css</p>
    <button className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Get Started</button>
    </header>

    {/* <!-- First Grid --> 
    <div className="w3-row-padding w3-padding-64 w3-container">
    <div className="w3-content">
        <div className="w3-twothird">
        <h1>Lorem Ipsum</h1>
        <h5 className="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>

        <p className="w3-text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="w3-third w3-center">
        <i className="fa fa-anchor w3-padding-64 w3-text-red"></i>
        </div>
    </div>
    </div>

    {/* <!-- Second Grid --> 
    <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
    <div className="w3-content">
        <div className="w3-third w3-center">
        <i className="fa fa-coffee w3-padding-64 w3-text-red w3-margin-right"></i>
        </div>

        <div className="w3-twothird">
        <h1>Lorem Ipsum</h1>
        <h5 className="w3-padding-32">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>

        <p className="w3-text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
    </div>
    </div>

    <div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
        <h1 className="w3-margin w3-xlarge">Quote of the day: live life</h1>
    </div>

    {/* <!-- Footer --> 
    <footer className="w3-container w3-padding-64 w3-center w3-opacity">  
    <div className="w3-xlarge w3-padding-32">
        <i className="fa fa-facebook-official w3-hover-opacity"></i>
        <i className="fa fa-instagram w3-hover-opacity"></i>
        <i className="fa fa-snapchat w3-hover-opacity"></i>
        <i className="fa fa-pinterest-p w3-hover-opacity"></i>
        <i className="fa fa-twitter w3-hover-opacity"></i>
        <i className="fa fa-linkedin w3-hover-opacity"></i>
    </div>
    <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
    </footer>
    </body>

        </div>
        )
        */
  }
}

export default Homepage;
