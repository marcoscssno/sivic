import Link from 'next/link'

export default function IndexPage() {
  return (
    <div>
      Hello World.{' '}
      <Link href="/cadastrar-videoconferencia">
        <a>Cadastrar Videoconferência</a>
      </Link>
    </div>
  )
}
