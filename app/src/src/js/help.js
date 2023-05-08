function openHelp() {
  spawnPopup({
    title: "Help",
    content: `
      <div class="help">
        <div class="help-item">
          <div class="help-title">What is this?</div>
          <div class="help-content">
            <p>This is a game where you can buy and sell items to make money.</p>
            <p>There are many items to buy and sell, and you can unlock more by completing achievements.</p>
            <p>There are also many upgrades to buy, which will help you make more money.</p>
            <p>There are also many achievements to complete, which will give you rewards.</p>
          </div>
        </div>
        <div class="help-item">
          <div class="help-title">How do I play?</div>
          <div class="help-content">
            <p>Click the <strong>Buy</strong> button to buy an item.</p>
            <p>Click the <strong>Sell</strong> button to sell an item.</p>
            <p>Click the <strong>Shop</strong> button to open the shop.</p>
            <p>Click the <strong>Upgrades</strong> button to open the upgrades.</p>
            <p>Click the <strong>Achievements</strong> button to open the achievements.</p>
            <p>Click the <strong>Help</strong> button to open this help.</p>
          </div>
        </div>
        <div class="help-item">
          <div class="help-title">What are the buttons at the top?</div>
          <div class="help-content">
            <p>The <strong>Stats</strong> button will create a dropdown showing your stats.</p>
            <p>The <strong>Save</strong> button will save your progress.</p>
            <p>The <strong>Reset</strong> button will reset your progress.</p>
          </div>
        </div>
      </div>
    `,
    buttons: [
      "close"
    ]
  });
}