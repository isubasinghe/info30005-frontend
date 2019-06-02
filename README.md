# info30005-frontend

## User Authentication/Account Creation
This particular functionality refers to how people will use our website. All users must have a registered account. This can be broken down further into a few sub-fucntionalities.

### User Sign Up
Users can sign up through entering their name, email address, a password and an address. The backend validates the submitted forms, ensuring the email is of valid format and the address is a valid location. This functionality ensures that people can use the core features of our website and provide a customised experience for individual users.

### User Sign in
User's can login using their email and password to access their own kitchen/account items. This returns a JWT token to ensure that once a user is logged in, the token is used to retrieve information from the database in a secure manner (only the logged in user can access the database).

## Viewing all items
This allows the user to make a call to the database and return all the current items in their inventory. This is useful for users to know exactly what they have in their pantries at home, without physically having to be at their home kitchen. The items also have a label for items expiring soon to alert users about what items they need to use soon.

## Expired items
This allows the user to make a call to the database and return all the expired items in their items. This gives the user an idea about what they have wasted so that they can avoid it happening in the future (potnetially buy less of that particular item).

## Adding items
User's are able to add an item, through sending the item name, category (from a defined group), the quantity, units and date of expiry. This will allow users to ensure their is a digital copy of their items at home wich will be later used for tracking items.

## Mykitchen search
Searches the users current items and displays items that match the search and if none match, shows all items. This allows users who have many items to easily check a particular item's quantity

## Updating item quantities
User's can update the quantity of items through dynamically checking the units and changing the quantity approapriately. Depending on the quantity, the system will simply update or remove the item altogether. This allows users to keep track of how much item they have and adjust when they consume the items.

## Recipe Generation
A user's items is checked and in order of expiry, a list of recipes are generated. In the case of no recipes, it will generate for the one ingredient expiring soon. This provides users with a way to use their items that will be expiring soon

## Marketplace search
User's can check other user's items (and search for an item they want or look at items nearby them) they have to offer and click a button to send an email to the owner; allowing a trade to potentially occur. This allows user's to trade items and get rid of items they may not be able to use before the expiry.
