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


## About Interview Scheduler

Interview Scheduler is an application that you can use to keep track of Interview appointments for the week.

There are 5 Interview spots per day, from 12pm to 5pm.

!["This is the Home screen, showing appointments for the selected day"](https://github.com/Be-Rude/scheduler/blob/master/docs/Appointment%20List%20for%20Day.png?raw=true)

##

## Features:

### Create New Appointment

Create New Appointment - Click on the + add button on any available appointment spot.
This will open up the appointment form. Add the Student name, select desired interviewer, then click 'save'.

!["New appointment form"](https://github.com/Be-Rude/scheduler/blob/master/docs/Create%20new%20appointment%20form.png?raw=true)

### Edit Appointment Details

Simply Click on the 'edit' button in the lower right corner of the appointment card (which will appear when you hover over the appointment card) - this will open the form and allow you to make any necessary changes.

!["Edit Appointment"](https://github.com/Be-Rude/scheduler/blob/master/docs/Edit%20Form.png?raw=true)

### Delete Appointment

To delete an appointment, click on the 'delete' button in the lower right corner of the appointment card (which will appear when you hover over the appointment card) - a confirmation window will appear, select 'confirm' to delete the appointment.

!["Delete confirmation window"](https://github.com/Be-Rude/scheduler/blob/master/docs/Day%20Full%20-%20no%20appointments%20available.png?raw=true)

### Day Full

When the day is full, and all appointment spots are booked, the day will be greyed out and will display "no spots remaining". You will not be able to book any more appointments, unless you delete one or more to open up spots.

##

I hope you enjoy Interview Scheduler! Please feel free to send me any feedback or feature requests.

