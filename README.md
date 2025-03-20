
# RailRunner 🚆

**RailRunner** is a user-friendly web application designed to help users search for trains, check seat availability, and track train status in real-time. Built with modern web technologies, RailRunner provides a seamless experience for train travelers.

👉 **Live Website:** [https://rail-runner.vercel.app/](https://rail-runner.vercel.app/)

---

## Features ✨

1. **Train Search**:
   - Search for trains between two stations.
   - View train details such as name, number, class, and run days.

2. **Seat Availability**:
   - Check seat availability for a specific train, date, and class.

3. **Train Status**:
   - Track the real-time status of a train, including its current location, next station, delay, and more.

4. **User Authentication**:
   - Sign up and log in to access personalized features.
   - Reset password functionality.

5. **Responsive Design**:
   - Optimized for desktop, tablet, and mobile devices.

6. **Real-Time Data**:
   - Integrated with APIs to fetch live train data.

---

## Technologies Used 🛠️

- **Frontend**:
  - HTML, CSS, JavaScript
  - [Firebase](https://firebase.google.com/) for authentication and database
  - [Boxicons](https://boxicons.com/) for icons

- **Backend**:
  - APIs for fetching train data (e.g., IRCTC APIs)

- **Hosting**:
  - [Vercel](https://vercel.com/) for deployment

---

## How to Use 🚀

### 1. **Search for Trains**:
   - Enter the source and destination stations.
   - Select the date of travel.
   - Click "Search Trains" to view available trains.

### 2. **Check Seat Availability**:
   - Click "Check Seat Availability" on a specific train card.

### 3. **Track Train Status**:
   - Enter the train number to view its real-time status, including current location, next station, and delay.

### 4. **User Authentication**:
   - Sign up or log in to access personalized features.
   - Use the "Forgot Password" option to reset your password.

## API Integration 🌐

RailRunner integrates with external APIs to fetch real-time train data. Below are the key API endpoints used:

- **Train Search**:
  ```
  https://IRCTC.proxy-production.allthingsdev.co/api/v3/trainBetweenStations?fromStationCode=XXX&toStationCode=YYY&dateOfJourney=YYYY-MM-DD
  ```

- **Train Status**:
  ```
  https://IRCTC.proxy-production.allthingsdev.co/api/v1/liveTrainStatus?trainNo=XXXXX&startDay=1
  ```

- **Seat Availability**:
  ```
  https://IRCTC.proxy-production.allthingsdev.co/api/v3/checkSeatAvailability?trainNumber=XXXXX&fromStation=XXX&toStation=YYY&date=YYYY-MM-DD&class=ZZZ
  ```

---

## Screenshots 📸

### Landing Page
![image](https://github.com/user-attachments/assets/3948eb5f-2d16-4bc6-bcc1-8742b31bb969)

### Login/SignUp Page
![Uploading image.png…]()


### Train Search Results
![image](https://github.com/user-attachments/assets/748af116-a180-47bd-84c2-98990b6f5122)
![image](https://github.com/user-attachments/assets/223a705c-ce6e-4a62-b45c-f7c4f856b99a)


### Train Status
![image](https://github.com/user-attachments/assets/55a7d994-3dcb-4d9e-bac4-f8e2d9f8eca3)


---

## Contributing 🤝

Contributions are welcome! If you'd like to contribute to RailRunner, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---



## Contact 📧

For any questions or feedback, feel free to reach out:

- **Email**: manavpatel0767@gmail.com
- **GitHub**: [Mp3949](https://github.com/Mp3949)
- **Website**: [https://rail-runner.vercel.app/](https://rail-runner.vercel.app/)

---

Thank you for using **RailRunner**! 🚆✨
