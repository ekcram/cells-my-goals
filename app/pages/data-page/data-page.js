import { html, css, LitElement } from 'lit-element';
import { CellsPageMixin } from '@cells/cells-page-mixin';
import { bbvaReturn } from '@bbva-web-components/bbva-foundations-icons';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';

const iconReturn = bbvaReturn();

class DataPage extends CellsPageMixin(LitElement) {
  static get is() {
    return 'data-page';
  }

  constructor() {
    super();
    this.totalGoalAmount = 0;
    this.totalSavedAmount = 0;
    this.handleChannels();
  }

  static get properties() {
    return {
      totalSavedAmount: { type: Number },
      totalGoalAmount: { type: Number },
      goals: { type: Array }
    };
  }

  static get styles() {
    return css`
    bbva-web-link {
      margin: 1rem 0;
    }
  `;
  }

  gotoGoal() {
    this.navigate('goal');
  }

  handleChannels() {
    this.subscribe('total_goals_channel', data => {
      this.totalGoalAmount = data.totalGoalAmount;
      this.totalSavedAmount = data.totalSavedAmount;
    });
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
        <bbva-web-link @click=${this.gotoGoal} icon="iconReturn">Back to goal page</bbva-web-link>
          ${this._summaryTpl}
        </div>
      </demo-app-template>
    `;
  }

  get _summaryTpl() {
    return html`
    <bbva-list-goal
      goal-title="Summary"
      progress-bar-color="#48AE64"
      amount=${this.totalSavedAmount}
      total-amount=${this.totalGoalAmount}
      show-amounts
      decimals-hidden
      description3="Saved"
      percentage
      badge-type="success"
      badge-title="${this.totalSavedAmount >= this.totalGoalAmount ? 'Completed!' : ''}"
    ></bbva-list-goal>
  `;
  }

}
window.customElements.define(DataPage.is, DataPage);