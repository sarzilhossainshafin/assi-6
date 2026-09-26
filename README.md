# 💪 FITLOG — Workout Library

FITLOG is a modern workout planning web application built with Next.js.
It allows users to explore workouts, view detailed exercise information,
create a daily workout plan, and save workouts for later.

## 🚀 Live Project

Add your deployed project link here.

## 📌 Project Description

FITLOG is a dark-themed workout companion designed to help users organize
their daily workouts.

Users can browse the workout library, sort exercises by duration, calories,
or rating, view complete workout details, add exercises to today's plan,
save workouts for later, and mark completed workouts as done.

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- React Context API
- LocalStorage
- JSON API / Workout Data
- Vercel

## ✨ Key Features

### 1. Workout Library

Browse workouts covering different muscle groups with information such as:

- Workout name
- Muscle groups
- Equipment
- Duration
- Calories
- Rating

### 2. Workout Details

Each workout has a dedicated details page containing:

- Workout image
- Description
- Muscle groups
- Equipment
- Difficulty
- Sets
- Reps
- Duration
- Calories
- Rating
- Step-by-step instructions

### 3. Today's Workout Plan

Users can add workouts to today's plan.

The plan supports a maximum of five workouts and shows:

- Total exercises
- Total minutes
- Total calories

### 4. Save Workouts for Later

Users can save workouts they want to complete later.

Saved workouts are available from the Saved tab on the My Plan page.

### 5. Sort Workouts

The workout library can be sorted by:

- Duration
- Calories
- Rating

### 6. Mark Workouts as Done

Users can mark planned workouts as completed.

A toast notification is displayed when a workout is marked as done.

### 7. Remove Workouts

Users can remove workouts from today's plan or saved workouts.

A toast notification confirms the action.

### 8. Persistent Data

Today's Plan and Saved workouts are stored in LocalStorage,
so the data remains available after refreshing the page.

## 📱 Responsive Design

FITLOG is designed to work across:

- Mobile devices
- Tablets
- Desktop screens

## 📂 Main Project Structure

```text
src/
├── app/
│   ├── my-plan/
│   ├── workouts/
│   │   └── [id]/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── homepage/
│   │   └── Library.tsx
│   │
│   └── shared/
│       ├── LibraryCard.tsx
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── context/
│   └── PlanContext.tsx
│
└── types/
    └── library.type.ts