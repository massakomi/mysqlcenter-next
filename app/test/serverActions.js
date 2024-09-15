export default function ServerActions() {
  async function createInvoice(formData) {
    'use server'

    const rawFormData = {
      amount: formData.get('amount'),
    }

    console.log(rawFormData)

    // mutate data
    // revalidate cache
  }

  // Пример серверных действий - асинхронные функции, которые выполняются на сервере
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

  // Справка по компоненту Form
  // https://react.dev/reference/react-dom/components/form#handle-form-submission-with-a-server-action

  // Есть пример передачи доп.аргументов (параметр, форма) а не просто (форма)
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments
  // + пример программного вызова + примеры валидации

  // todo разбор Server-side form validation и все что ниже

  return (
    <>
      <h2>Server Actions and Mutations</h2>
      <form action={createInvoice}>
        <input type="text" name="amount" />
        <input type="submit" value="Send"/>
      </form>
      <a onClick={createInvoice.bind(new FormData())}>Можно по кнопке и т.п.</a>
    </>
  );
}
