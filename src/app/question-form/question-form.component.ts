import { Component, DebugElement } from '@angular/core';
import { QUESTIONS } from '../questions-data';
import { QuestionsTemplate } from '../questions-template';

@Component({
	selector: 'app-question-form',
	templateUrl: './question-form.component.html',
	styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent {
	questions: QuestionsTemplate[] = QUESTIONS;
	selectedAnswers: string[] = new Array(this.questions.length).fill('');
	selectedIndexes: number[] = new Array(this.questions.length).fill(0);

	onFormSubmit() {
		for (let i = 0; i < this.questions.length; i++) {
			if (this.selectedAnswers[i] === '') {
				alert('Prosím odpovedzte na všetky otázky');
				return;
			}
		}

		for (let i = 0; i < this.questions.length; i++) {
			for (let j = 0; j < this.questions[i].answer.length; j++) {
				if (this.selectedAnswers[i] === this.questions[i].answer[j]) {
					this.selectedIndexes[i] = j+1;
				}
			}

		}
		console.log(this.selectedIndexes);
		console.log(evaluateArrayPoints(this.selectedIndexes));
		getMentalHealthRating(evaluateArrayPoints(this.selectedIndexes), this.selectedAnswers.length*5);
	}
	  
}

function evaluateArrayPoints(arr: number[]): number {
	let counter = 0;
	for (const number of arr) {
	  if (number === 1) {
		counter += 5;
	  } else if (number === 5) {
		counter += 1;
	  }
	}
	return counter;
  }

  function getMentalHealthRating(totalScore: number, maxScore: number) {
	var percentage = (totalScore / maxScore) * 100;
  
	var mentalHealthLevel = 'Unknown';
  
	var ratingRanges = [
	  { minPercentage: 90, rating: 'Tvoje duševné zdravie je na tom výborne' },
	  { minPercentage: 75, rating: 'Tvoje duševné zdravie je na tom celkom dobre' },
	  { minPercentage: 60, rating: 'Tvoje duševné zdravie je na tom dobre' },
	  { minPercentage: 40, rating: 'Tvoje duševné zdravie na tom nieje najlepšie' },
	  { minPercentage: 0, rating: 'Mal by si vyhľadať pomoc' }
	];
  
	for (var i = 0; i < ratingRanges.length; i++) {
	  var range = ratingRanges[i];
	  if (percentage >= range.minPercentage) {
		mentalHealthLevel = range.rating;
		break;
	  }
	}
  
	alert(mentalHealthLevel);
  }
  
  