import '@styles/globals.css';
import Nav from '@components/nav';
import Provider from '@components/provider';

export const metadata = {
    title: 'Prompt-Up',
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({children}) => {
  return (
    <html Lang="en">
        <body>
          <Provider>
            <div className='main'>
               <div className='gradient' />
            </div>

            <main className='app'> 
                <Nav />
                {children}
            </main>
          </Provider>
        </body>

    </html>
  )
}

export default RootLayout