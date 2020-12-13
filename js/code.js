const Confirm = {
  open(options) {
    options = Object.assign(
      {},
      {
        title: '',
        message: '',
        okText: 'OK',
        cancelText: 'Cancel',
        onok: function () {},
        oncancel: function () {},
      },
      options
    );

    const html = `
    <div class="confirm">
        <div class="confirm__window">
            <div class="confirm__titlebar">
                <span class="confirm__title">${options.title}</span>
                <button class="confirm__close">&times;</button>
            </div>
            <div class="confirm__content">
                ${options.message}
            </div>
            <div class="confirm__buttons">
                <button class="confirm__button confirm__button--ok confirm__button--fill">${options.okText}</button>
                <button class="confirm__button confirm__button--cancel">${options.cancelText}</button>
            </div>
        </div>
    </div>    
    `;

    const template = document.createElement('template');
    template.innerHTML = html;

    const confirm_el = template.content.querySelector('.confirm');
    const btn_close = template.content.querySelector('.confirm__close');
    const btn_ok = template.content.querySelector('.confirm__button--ok');
    const btn_cancel = template.content.querySelector(
      '.confirm__button--cancel'
    );

    confirm_el.addEventListener('click', (e) => {
      if (e.target === confirm_el) {
        options.oncancel();
        this._close(confirm_el);
      }
    });

    btn_ok.addEventListener('click', (e) => {
      options.onok();
      this._close(confirm_el);
    });

    [btn_cancel, btn_close].forEach((el) => {
      el.addEventListener('click', () => {
        options.oncancel();
        this._close(confirm_el);
      });
    });
    document.body.appendChild(template.content);
  },

  _close(confirm_el) {
    confirm_el.classList.add('confirm--close');
    confirm_el.addEventListener('animationend', () => {
      document.body.removeChild(confirm_el);
    });
  },
};

let color = ['yellow', 'green', 'blue', 'red', 'grey'];

document.querySelector('#btnChangeBg').addEventListener('click', () => {
  Confirm.open({
    title: 'Background Chane',
    message: 'Are you sure you wish the background color',
    onok: () => {
      let colors = color[Math.floor(Math.random() * color.length)];
      console.log(colors);
      document.body.style.backgroundColor = colors;
    },
  });
});
