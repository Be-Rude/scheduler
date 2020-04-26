# Interview Scheduler

## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### About Interview Scheduler

Interview Scheduler is an application that you can use to keep track of Interview appointments for the week.

There are 5 Interview spots per day, from 12pm to 5pm.

!["This is the Home screen, showing appointments for the selected day"](url)

## Features:

### Create New Appointment

Create New Appointment - Click on the + add button on any available appointment spot.
This will open up the appointment form. Add the Student name, select desired interviewer, then click 'save'.

!["New appointment form"](url)

### Edit Appointment Details

Simply Click on the 'edit' button in the lower right corner of the appointment card (which will appear when you hover over the appointment card) - this will open the form and allow you to make any necessary changes.

### Delete Appointment

To delete an appointment, click on the 'delete' button in the lower right corner of the appointment card (which will appear when you hover over the appointment card) - a confirmation window will appear, select 'confirm' to delete the appointment.

!["Delete confirmation window"](url)

### Day Full

When the day is full, and all appointment spots are booked, the day will be greyed out and will display "no spots remaining". You will not be able to book any more appointments, unless you delete one or more to open up spots.



