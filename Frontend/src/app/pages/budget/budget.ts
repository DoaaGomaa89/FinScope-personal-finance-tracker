// <div class="form-container">
//   <h2>{{ editBudgetId ? '✏️ Update Budget' : '➕ Set Budget' }}</h2>
//   <form [formGroup]="budgetForm" (ngSubmit)="setBudget()">
//     <input type="text" formControlName="category" placeholder="Category (e.g., Food)" />
//     <input type="month" formControlName="month" />
//     <input type="number" formControlName="limitAmount" placeholder="Limit Amount (₹)" />
//     <button type="submit" [disabled]="budgetForm.invalid">
//       {{ editBudgetId ? 'Update' : 'Set' }}
//     </button>
//     <p>{{ message }}</p>
//   </form>
// </div>

// <hr />

// <div class="budget-list">
//   <h3>📋 Budget List</h3>
//   <div *ngFor="let budget of budgets" class="budget-card">
//     <div class="card-header">
//       <div>
//         <strong>📁 {{ budget.category }}</strong>
//         <div>📅 {{ budget.month }} | 💰 ₹{{ budget.limitAmount }}</div>
//       </div>
//       <i class="fa fa-edit edit-icon" (click)="editBudget(budget)"></i>
//     </div>
//   </div>
// </div>......
// budget-wrapper {
//   max-width: 900px;
//   margin: 30px auto;
//   background: #fafaff;
//   padding: 30px;
//   border-radius: 16px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
//   font-family: 'Segoe UI', sans-serif;
// }

// h2, h3 {
//   color: #333;
//   margin-bottom: 20px;
//   font-weight: 600;
// }

// form {
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// }

// .form-group {
//   display: flex;
//   flex-direction: column;
// }

// label {
//   font-weight: 500;
//   color: #555;
//   margin-bottom: 4px;
// }

// input {
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   font-size: 0.95rem;
//   transition: border-color 0.2s, box-shadow 0.2s;
// }

// input:focus {
//   outline: none;
//   border-color: #7048e8;
//   box-shadow: 0 0 5px #cfc1f4;
// }

// button {
//   padding: 10px;
//   background-color: #7048e8;
//   color: #fff;
//   font-weight: 500;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background 0.3s;
// }

// button:hover:enabled {
//   background-color: #5e3bd1;
// }

// button:disabled {
//   background-color: #b4a8e2;
//   cursor: not-allowed;
// }

// .message {
//   margin-top: 12px;
//   font-weight: 600;
//   color: #007b00;
// }

// /* Budget List Section */
// .budget-list {
//   margin-top: 40px;
// }

// .budget-card {
//   background-color: #fff;
//   border: 1px solid #e2e2e2;
//   border-radius: 12px;
//   padding: 15px;
//   margin-bottom: 12px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//   transition: transform 0.2s ease-in-out;
// }

// .budget-card:hover {
//   transform: translateY(-2px);
// }

// .card-header{
//   display: flex;
//   justify-content: space-between;
// }
// .icons{
//   display: flex;
//   gap: 10px;
// }

// .empty-msg {
//   font-style: italic;
//   color: #888;
// }
 