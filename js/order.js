(function() {
  'use strict';

  $('.button-collapse').sideNav();

  const dogs = [];
  const $tbody = $('tbody');
  const $subtotal = $('#subtotal');
  const $tax = $('#tax');
  const $total = $('#total');
  const profileData = [];

  const calcOrder = function() {
    let subtotal = 0;
    const $tablerow = $('<tr>');
    const $dogNameCell = $('<td>');
    const $priceCell = $('<td>');

    for (const dog of dogs) {
      $dogNameCell.text(dog.name);
      $priceCell.text(`$${dog.price.toFixed(2)}`);
      $priceCell.addClass('right-align');
      $tablerow.append($dogNameCell);
      $tablerow.append($priceCell);
      $tbody.append($tablerow);
      subtotal += dog.price;
    }

    const tax = subtotal * 0.0975;
    const total = subtotal + tax;

    $subtotal.text(`$${subtotal.toFixed(2)}`);
    $tax.text(`$${tax.toFixed(2)}`);
    $total.text(`$${total.toFixed(2)}`);
  };

  calcOrder();

  $('.addDog').on('click', (event) => {
    const dog = {};
    const $target = $(event.target);
    const $cardContent = $target.parent().siblings('.card-content');

    dog.name = $cardContent.children('.card-title').text();
    dog.price = parseFloat($cardContent.children('p').text().slice(1));
    dogs.push(dog);
    calcOrder();
    event.preventDefault();
  });

  function Customer(name, email, phoneNumber, address) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }

  const getUserData = (event) => {
    event.preventDefault();
    const customerName = event.target.name.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phone_number.value;
    const address = event.target.address.value
    const newCustomer = new Customer(customerName, email, phoneNumber, address);
    const jsonCustomer = JSON.stringify(newCustomer);
    localStorage.setItem('customerProfile', jsonCustomer);
  }

  $('form').on('submit', getUserData);

  $('#name, #phone_number, #address').on('blur', (event) => {
    const $target = $(event.target);
    const value = $target.val();

    if (!value.length) {
      $target.removeClass('valid');
      $target.removeClass('invalid');
    }
    else if (value.trim() === '') {
      $target.removeClass('valid');
      $target.addClass('invalid');
    }
    else {
      $target.removeClass('invalid');
      $target.addClass('valid');
    }
  });

  $('#placeOrder').on('click', (event) => {
    if (!dogs.length) {
      Materialize.toast('Please add a dog to your oder.', 4000);

      return;
    }

    if ($name.val().trim() === '') {
      Materialize.toast('Please enter a name.', 4000);

      return;
    }

    if ($phoneNumber.val().trim() === '') {
      Materialize.toast('Please enter a phone number.', 4000);

      return;
    }

    if ($address.val().trim === '') {
      Materialize.toast('Please type an address.', 4000);

      return;
    }

    Materialize.toast('Order placed. Thank you!', 4000);
    $tbody.empty();
    event.preventDefault();
  });
})();
