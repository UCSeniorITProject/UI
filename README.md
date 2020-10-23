# UI
Predictive Algorithm for Predicting Prescription Abuse


# Synopsis
I examine the use of creating a predictive algorithm to help curb the opioid abuse epidemic. I find that a data-based approach to determining prescriptions can help doctors make a more informed decision in the prescription process. Through creating a mock cloud-based pharmacy system, importing data from the CDC on prescription habits, and creating a predictive algorith, I was able to create a prototype that shows that data can drive doctors to make more informed decisions.
# Reseach Question
Can a predictive algorithm be created that can stop opioid prescription abuse with a great degree of success?

# Problem Statement
In the perspective of someone who is addicted to opioids, or who is yet to be addicted, one can simply go into the emergency room for minor pain, and come out with extremely potent pharmaceuticals. Once taken, your body can become addicted, and it continues to crave the satisfaction of another dose. The problem lies in that a patient can go to a hospital, get these powerful drugs, then move onto a different hospital to get more. This creates a societal problem in that we are empowering addicts to further their addictions. Since hospitals are often not connected, they lack a link in information that could help them make more informed choices. But, this problem goes even further than just hospitals — it goes to family doctors, urgent care, etc. They all need to be in a more connected world, and that is where the solution of this predictive algorithm comes in. An application needs to be developed that is cloud-based that connects all of these healthcare organizations together, and on top of this, provides doctors and pharmacists with the information they need to do their job. And, given the data that this would produce, algorithms could be established to make smarter decisions.

# Data Preperation
This study uses data straight from the Center of Medicare and Medicaid Services and Kaggle.
## https://www.kaggle.com/apryor6/us-opiate-prescriptions?select=prescriber-info.csv
## https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/Medicare-Provider-Charge-Data/Part-D-Prescriber

Using APIs that I created for importing data, I created several endpoints that were able to import these CSV files. With this data, the application could make more informed decisions when doing the prescription decision logic.

# Feature Engineering
The application is created with a React front end that is served by a Node.js back end on Fastify and MSSQL. The database structure is far too complex to explain in words. Specifics on that can be seen in the service repositories themselves.

## Pharmaceutical Service (https://github.com/UCSeniorITProject/Pharmaceutical)
## Data Importer (https://github.com/UCSeniorITProject/OverdoseDataScraper)
## Patient Service (https://github.com/UCSeniorITProject/PatientManagement)
## Security Service (https://github.com/UCSeniorITProject/SecurityManagement)
## Gateway Service (https://github.com/UCSeniorITProject/Gateway)

The basic flow of data is that every request goes to the gateway service where the user information is authenticated by sending a JSON web token to the security service that says this token is or is not valid. If the token is valid, the request is proxied to one of the services. If the token is not valid, the request is rejected. This is how stateless authentication is provided. 

Each one of the datbase tables has a page that allows basic CRUD, and then the prescription wizard is a combination of all that data into one page that allows prescriptions to happen.

# Conclusion

In this project of creating an application to manage prescriptions, I did research on how the opioid crisis continues to be fed, and how it can be stopped. I have designed a functioning application to demonstrate how data analysis can potentially help curb the rates of abuse across the country. There is still much work that can be done to help improve the algorithm, and the app as a whole, but many of these features serve as a high-fidelity prototype.
