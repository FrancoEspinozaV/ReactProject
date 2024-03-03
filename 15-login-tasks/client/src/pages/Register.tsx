export function Register() {
  const classInput = 'w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const newData = new FormData(form)
    const data = Object.fromEntries(newData)

    const { username, email, password } = data

    console.log(username, email, password)
  }
  return (
    <>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='username'
            className={classInput}
          />
          <input
            type='email'
            name='email'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            required
            placeholder='username@gmail.com'
            className={classInput}
          />
          <input
            className={classInput}
            type='password'
            name='password'
            pattern='.{6,}'
            title='La contraseña debe tener al menos 6 caracteres'
            required
            placeholder='**********'
          />

          <button>registrar</button>
        </form>
      </div>
    </>
  )
}
