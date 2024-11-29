import '@bbva-web-components/bbva-form-field';
import '@bbva-web-components/bbva-form-amount';
import '@bbva-web-components/bbva-button-default';
import '@bbva-web-components/bbva-list-goal';
import { bbvaTrash } from '@bbva-web-components/bbva-foundations-icons';
import { html, css, LitElement } from 'lit-element';
import { CellsPageMixin } from '@cells/cells-page-mixin';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';

const iconTrash = bbvaTrash();

class GoalPage extends CellsPageMixin(LitElement) {
  static get is() {
    return 'goal-page';
  }

  static get properties() {
    return {
      goals: { type: Array },
      newGoalDescription: { type: String },
      newGoalAmount: { type: Number }
    };
  }

  static get styles() {
    return css`
      .form > *, 
      bbva-web-link {
        margin-top: 1rem;
      }
    `;
  }

  constructor() {
    super();
    this.goals = [];
    this.newGoalDescription = '';
    this.newGoalAmount = 0;
  }

  addGoal() {
    this.goals = [...this.goals, {
      description: this.newGoalDescription,
      savedAmount: 0,
      goalAmount: this.newGoalAmount
    }
    ];
    this.newGoalDescription = '';
    this.newGoalAmount = 0;
  }

  get noGoalData() {
    return (this.newGoalDescription.trim() === '') || (this.newGoalAmount <= 0);
  }

  addMoney(selecteIndex) {
    this.goals[selecteIndex].savedAmount = this.goals[selecteIndex].savedAmount + 10;
    this.goals = [].concat(this.goals);
  }

  removeGoal(selecteIndex) {
    this.goals.splice(selecteIndex, 1);
    this.goals = [].concat(this.goals);
  }

  //ccomputed property to get the total amounts
  get totals() {
    let totalGoalAmount = 0;
    let totalSavedAmount = 0;
    this.goals.forEach(g => {
      totalGoalAmount = totalGoalAmount + g.goalAmount;
      totalSavedAmount = totalSavedAmount + g.savedAmount;
    });
    return { totalGoalAmount, totalSavedAmount };
  }

  gotoData() {
    this.publish('total_goals_channel', this.totals);
    this.navigate('data');
  }

  get _formTpl() {
    return html`
      <div class="form">
        <bbva-form-field
          @change=${(e) => {
        this.newGoalDescription = e.target.value;
      }}
          label="Goal"
          value=${this.newGoalDescription}
        >
        </bbva-form-field>
  
        <bbva-form-amount
          @form-amount-input-change=${(e) => {
        this.newGoalAmount = e.detail.amount;
      }}
          label="Amount"
          amount=${this.newGoalAmount}
        >
        </bbva-form-amount>
  
        <bbva-button-default @click=${this.addGoal} ?disabled=${this.noGoalData}>
          Add Goal
        </bbva-button-default>
      </div>
    `;
  }

  get _listTpl() {
    return html`
     ${this.goals.map((g, i) =>
      html`
        <bbva-list-goal
          progress-bar-color="#48AE64"
          goal-title=${g.description}
          amount=${g.savedAmount}
          total-amount=${g.goalAmount}
          simple-link=${g.savedAmount < g.goalAmount ? 'Add 10€' : ''}
          icon=${iconTrash}
          decimals-hidden
          show-amount-result
          description3="Missing"
          icon-has-action
          badge-type="success"
          badge-title="${g.savedAmount >= g.goalAmount ? 'Completed!' : ''}"
          @list-goal-simple-link-click=${e => this.addMoney(i)}
          @list-goal-action-click=${e => this.removeGoal(i)}
          >
        </bbva-list-goal><hr>`
    )
      }
    `;
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
          ${this._formTpl}
          ${this._listTpl}
          <bbva-web-link @click=${this.gotoData}>Go to data page</bbva-web-link>
        </div>
      </demo-app-template>`;
  }
}

window.customElements.define(GoalPage.is, GoalPage);