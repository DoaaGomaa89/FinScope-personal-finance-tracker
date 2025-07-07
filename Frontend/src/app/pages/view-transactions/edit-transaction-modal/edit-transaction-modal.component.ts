import { Component, Input } from '@angular/core';
import { TransactionResponse } from '../transaction-response.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewTransactionsService } from '../../../services/view-transactions.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-transaction-modal.component.html',
  styleUrl: './edit-transaction-modal.component.css'
})
export class EditTransactionModalComponent {

  @Input() transaction!: TransactionResponse;

  constructor(
    public activeModal: NgbActiveModal,
    private service: ViewTransactionsService
  ) {}

  saveChanges() {
    console.log("Saving transaction:", this.transaction);
    this.service.updateTransaction(this.transaction.id, this.transaction).subscribe({
      next: () => {
      console.log("Update successful");
      this.activeModal.close();
    },
      error: (err) => console.error("Update failed", err)
    });
  }
}
