import React from 'react'
import TitleHeader from '../components/TitleHeader'
import { skillImages } from '../constants'

const TechStack = () => {
  return (
    <section id='skills' className='flex-center secton-padding px-10'>
      <div className='mt-20'>
        <TitleHeader
          title='My TechStack'
          sub='Technologies I have worked with'
        />

        <div className='flex flex-col lg:flex-row gap-10 pt-20 pb-10 justify-center items-center lg:gap-20'>
          <div className='p-5 flex flex-wrap gap-3 bg-black-100 card-border lg:w-2/4'>
            {
              skillImages.map((img) => (
                <div key={img} className='flex  justify-cent'>
                  <img src={img.imgPath}  alt='skill images' className='lg:size-20 rounded-xl' />
                </div>
              ))
            }

          </div>

          <div className='lg:w-4/6'>
            <div>
              <ul className='flex flex-col gap-5'>
                <li className='list-disc text-xl text-white-50'>
                  <span className='text-white font-bold'>Front-End: </span>
                  HTML, CSS, JavaScript, React.Js, Next.Js.
                </li>
                <li className='list-disc text-xl text-white-50'>
                  <span className='text-white font-bold'>Back-End: </span>
                  Node.Js, ExpressJs.
                </li>
                <li className='list-disc text-xl text-white-50'>
                  <span className='text-white font-bold'>Databases: </span>
                  MongoDB, MySQL, PostgreSQL.
                </li>
                <li className='list-disc text-xl text-white-50'>
                  <span className='text-white font-bold'>Tools and Platform: </span>
                  Git, GitHub, Docker, AWS, Firebase, Vercel, Render.
                </li>
                <li className='list-disc text-xl text-white-50'>
                  <span className='text-white font-bold'>Others: </span>
                  RESTFUL APIs, GraphQL, WebSockets, Redux, Tailwind CSS.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default TechStack