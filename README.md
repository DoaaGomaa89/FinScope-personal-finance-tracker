# FinScope - Personal Finance Tracker

A full-stack personal finance management web application that helps users track income, expenses, and budgets easily.

---

## Tech Stack:
  - **Backend**: Spring Boot + MySQL
  - **Frontend**: Angular (standalone components)
  - **Deployment**: Render (backend), Netlify (frontend), Railway (MySQL)

---

## Features
  - Add, edit, and delete income and expenses
  - Add, edit, and delete bank accounts (linked to transactions)
  - Dashboard with monthly summary bar chart + category-wise expense pie     charts
  - Filter transactions by type, category, bank, and month
  - CSV export, budget control
  - Reset password via email OTP
  - Responsive layout and clean UI

---

## Getting Started

### Prerequisites

  - Node.js + Angular CLI
  - Java 17 + Spring Boot
  - MySQL

---

### Backend Setup (Spring Boot)

  ```bash
  cd Backend
  # Update apllication.properties with your DB credentials
  mvn clean install
  mvn spring-boot:run
