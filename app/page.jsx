import Feed from "@components/feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col" >
       <h1 className="head_text text-center">
           Discover & Share
           <br className="max-md:hidden"/>{/* This hides break on medium screens */}
           <span className="orange_gradient text-center" >AI-Powered Prompts</span>
       </h1>
       <p className="desc text-center">
        Unleash creativity with an open-source AI prompting tool: discover, create, and share innovative prompts.</p>
        <Feed />
    </section>
  )
}

export default Home