package com.Finance_Tracker.demo.util;

import java.io.PrintWriter;
import java.util.List;

import com.Finance_Tracker.demo.transaction.TransactionResponse;

public class CsvExport {

	public static void writeTransactionToCsv(PrintWriter writer, List<TransactionResponse> transactions) {
		writer.println("Date,Type,Amount,Category,Description,Bank Account");

		for (TransactionResponse tx : transactions) {
			writer.printf("%s,%s,%.2f,%s,%s,%s%n",
					tx.getDate(), 
					tx.getType(), 
					tx.getAmount(), 
					tx.getCategory(),
					tx.getDescription(), 
					tx.getBankName()
			);
		}
	}
}
