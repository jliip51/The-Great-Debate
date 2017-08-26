# project-two-group

### Can adjust if we go with another idea

### Set up server
missing connection to sequelize sync
need to figure out if we use controller.js when using sequelize ORM
set up rendering to handlebars (this was in the controller previously so ??)

### Database
* Tables (User, Topics, Posts)
* User (Id, UserName)
* Topics (ID, Question, Start(Date/Time), Expires(Date/Time))
* Posts (Id, Headline, Position(for/against type input), Body, Links[Array])
#####Relational
* User Table (has many posts)
* Topic Table (has many posts)
* Post Table (has one User, has one Topic)

#### Packages installed
"body-parser": "^1.17.2",
"express": "^4.15.4",
"express-handlebars": "^3.0.0",
"jquery": "^3.2.1",
"mysql": "^2.14.1",
"passport": "^0.4.0",
"sequelize": "^4.6.0"

### Set up authentication with NPM Passport (Facebook, Twitter, Google options?)

## Checkout spec images folder
* [image 1](/spec_images/IMG1.JPG)
* [image 2](/spec_images/IMG2.JPG)
* [image 3](/spec_images/IMG3.JPG)
* [image 4](/spec_images/IMG4.JPG)
