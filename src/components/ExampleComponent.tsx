import { JSX } from 'react'

interface ExampleComponentProps {
  title: string
  description: string
}

export const ExampleComponent = ({ title, description }: ExampleComponentProps): JSX.Element => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
