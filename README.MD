### Features Working

# Login
-> after clicking the login successfully hit the api and able to login if user present in  the database

-> if succefully done login user redirect to the home page 

-> after login user not able to hit the login and register route

-> the login info will be save in store in redux with asseccToken to make it more secure password is not present there

-> asseccToken will automatically saved in localStorage using redux toolkit 

# Register
-> If user pass all the validation in the given form, api will be hit and also the user will get automatic login 

-> after succefull login user redirect to the home page 

-> after login user not able to hit the login and register route

-> and then all are same as login features

# Fetching Products From Database
-> using axios calls succefully able to fetch the available at data 

-> the data which come from the api will be stored in store 

-> the filters apply on the products which present in the store and not making any api calls

# View Single Product and add product in cart
-> user can choose one of product and able to select the color and size 
 
-> user can also able to select the quantity 

-> user can add the product in cart the changes reflect instantly in the navbar above cart icon

