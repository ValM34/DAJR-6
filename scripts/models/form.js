class Form {
  constructor (firstName, lastName, email, message) {
    this.form = [
      {
        name: 'firstName',
        pattern: /^.{2,}$/,
        errorMessage: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
        value: firstName
      },
      {
        name: 'lastName',
        pattern: /^.{2,}$/,
        errorMessage: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
        value: lastName
      },
      {
        name: 'email',
        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        errorMessage: 'Veuillez renseigner un email valide.',
        value: email
      },
      {
        name: 'message',
        pattern: /^.{10,}$/,
        errorMessage: 'Veuillez entrer 10 caractères ou plus pour votre message.',
        value: message
      }
    ]
  }

  isValid () {
    let allEntriesAreValid = true
    for (const [key, value] of Object.entries(this.form)) {
      this.form[key].isValid = value.pattern.test(this.form[key].value)
      if (this.form[key].isValid === false) {
        allEntriesAreValid = false
      }
    }
    return allEntriesAreValid
  }
}

export { Form }
