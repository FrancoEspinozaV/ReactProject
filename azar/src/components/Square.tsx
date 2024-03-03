import { SquareType } from "../types"

interface Props {
  numbersSuare: SquareType[]
  objectPath: SquareType | undefined
}

export function Square ({ numbersSuare, objectPath }: Props) {

  return (
    <>
      <ul className="grid grid-cols-5 gap-2">
        {
          numbersSuare.map((squeare) => {
            const bgColor = `${objectPath?.id === squeare.id ? 'pink' : squeare.background}`
            return (
              <ul
                className="select-none rounded-lg h-14 grid place-items-center font-semibold text-xl text-black"
                key={squeare.id}
                style={{
                  backgroundColor: bgColor,
                }}>
                {squeare.placeholder}
              </ul>
            )
          })
        }
      </ul>
    </>
  )
}