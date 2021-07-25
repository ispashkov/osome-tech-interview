import { RegistrationFormValues } from '../ui/registration-form/registration-form.types'

export class ApiService {
  static registration = async (data: RegistrationFormValues) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject({
          name: ['Имя пользователя уже используется'],
          email: ['E-mail не корректен', 'E-mail уже исползуется'],
          password: ['Пароль не достаточно безопасен'],
        })
      }, 3000)
    })
  }
}
