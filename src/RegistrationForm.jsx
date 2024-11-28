import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input, Radio, DatePicker, Button } from 'antd'


const RegistrationForm = () => {
  //вызываем хук для проверки/управления форм useForm 
  //делаем деструктуризацию объекта для извлечения определенных значений из хука 
  const { 
    handleSubmit, 
    control, 
    watch,
    formState: {errors}
  } = useForm ()
  //watch('password') в правиле для проверки поля подтверждения пароля, 
  //чтобы убедиться, что оно совпадает с введённым паролем
  const password = watch('password');
  //ф-ция onSubmit выз-ся при отправке формы
  //если все поля прошли валидацию,data будет содержать все значения полей формы
  const onSubmit = data => {
    console.log(data)
  }
  return (
    //создаем компонент формы
    //в onSubmit передаем handleSubmit->обрабатывает данные формы->нет ошибок,выз-ся 
    //ф-ция onSubmit c собранными данными формы
    <form onSubmit = {handleSubmit(onSubmit)}>
      <div>
        <label>Имя пользователя:</label>
        <Controller
          // имя поля
          name='text'
          // передается объект control,используется для управления состоянием формы 
          //и её логикой. 
          //обеспечивает связь между компонентом и системой валидации. 
          control = {control}
          //правила валидации для поля 
          rules = {{
            required: "Поле обязательно для заполнения",
            pattern: {
              value: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
              message: "Неверное имя пользователя"
            }
          }}
          render={({field}) => <Input {...field} placeholder="Имя пользователя"/>}
        />
        <p>{errors.text?.message}</p>
      </div>

      <div>
        <label>E-mail:</label>
        <Controller
          name = 'email'
          control={control}
          rules = {{
            required: "Поле обязательно для заполнения",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "Неверный адрес e-mail"
            }
          }}
          render={({field}) => <Input {...field} placeholder="E-mail"/>}
        />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Пароль:</label>
        <Controller
          name = 'password'
          control={control}
          rules = {{
            required: "Поле обязательно для заполнения",
            // миниммум 6 символов,хотя бы одна заглавная буква
            pattern: {
              value: /^(?=.*[A-Z]).{6,}$/,
              message: "Неверный пароль"
            }
          }}
          render={({field}) => <Input {...field} placeholder="Пароль"/>}
        />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label>Подтверждение пароля:</label>
        <Controller
          name = 'passwordConfirmation'
          control={control}
          rules = {{
            required: "Поле обязательно для заполнения",
            //получаем текущее значение поля с именем password
            validate: value => value === password || "Пароли не совпадают"
          }}
          render={({field}) => <Input {...field} placeholder="Подтверждение пароля"/>}
        />
        <p>{errors.passwordConfirmation?.message}</p>
      </div>
      <div>
        <label>Дата рождения:</label>
        <Controller
          name='dateOfBirth'
          control = {control}
          rules = {{
            required: "Поле обязательно для заполнения",
          }}
          render={({field}) => <DatePicker {...field} placeholder="Дата"/>}
        />
        <p>{errors.dateOfBirth?.message}</p>
      </div>
      <div>
        <label>Пол:</label>
        <Controller
          name='gender'
          control = {control}
          rules = {{
            required: "Поле обязательно для заполнения",
            
          }}
          render={({field}) =>(
            <Radio.Group {...field}>
              <Radio value = 'male'>Мужской</Radio>
              <Radio value = 'female'>Женский</Radio>
            </Radio.Group>
          )}
        />
        <p>{errors.gender?.message}</p>
      </div>

      <div>
        <label>Телефон:</label>
        <Controller
          name='phoneNumber'
          control = {control}
          rules = {{
            required: "Поле обязательно для заполнения",
            pattern: {
              value: /^((\+375|375)+([0-9]){9})$/ ,
              message: "Неверно указан номер телефона"
            }
          }}
          render={({field}) =>(
            <Input {...field} placeholder="+375"/>
          )}
        />
        <p>{errors.phoneNumber?.message}</p>
      </div>

      {/* кнопка отправки,связанная с handleSubmit */}
      {/* type='primary' в компоненте Button из библиотеки Ant Design (antd) 
      задаёт стиль кнопки 
      htmlType='submit' указывает, что кнопка является кнопкой отправки формы (submit)
      */}
      <Button type='primary' htmlType='submit'>
        Отправить
      </Button>
    </form>
  )
}
export default RegistrationForm