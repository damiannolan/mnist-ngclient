# MNIST Digit Prediction Web Application

This repository contains a relatively simple web application written using [Angular](https://angular.io). This webapp serves as a client application for uploading and drawing digits and making prediction requests to a back end Python Flask application which can be found in another repository located [HERE!](https://github.com/damiannolan/mnist-neural-network)

## Getting Started

Before getting the client application up and running I advise heading over to the back end repository linked above and following the instructions in order to launch the server application.

1. Download and install the [Angular CLI Tool](https://cli.angular.io/).

```
npm install -g @angular/cli
```

2. Clone this repository.

```
git clone https://github.com/damiannolan/mnist-ngclient.git
```

3. Install dependencies

```
npm install
```

4. Run the application dev server and navigate to `http://localhost:4200`.

```
ng serve
```

## Code Base

Components and Services were scaffolded using the Angular CLI Tool. 

```
ng generate component component-name
```

```
ng generate service service-name
```

The application consists of a small number of simple componenets and includes one service. 

- App Component
- Canvas Component
- Home Compoenent
- Nav Component
- Prediction Service
- Upload Component
