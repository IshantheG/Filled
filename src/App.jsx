import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './index.css'


// Main App Component with Page Router
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = {
    home: <HomePage setPage={setCurrentPage} />,
    about: <AboutPage />,
    team: <TeamPage />,
    session: <SessionPage />,
    getinvolved: <GetInvolvedPage />,
    contact: <ContactPage />
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {pages[currentPage]}
    </div>
  );
}

// Navbar Component
function Navbar({ currentPage, setPage, menuOpen, setMenuOpen }) {
  const navItems = [

    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'team', label: 'Team' },
    { id: 'session', label: 'Iteration 1.0' },
    { id: 'getinvolved', label: 'Get Involved' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            NextGen
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`font-medium transition-colors ${currentPage === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 ${currentPage === item.id ? 'text-white bg-gray-800' : 'text-gray-400'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Home Page
function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 -bottom-48 -right-48"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 bg-gradient-to-r from-[rgb(24,161,224)] via-blue-400 to-[rgb(157,5,187)] bg-clip-text text-transparent">
          NextGen Learning
        </h1>
        <p className="text-xl sm:text-xl md:text-xl font-light text-white mb-8 italic">
          Training the <span className="text-blue-500 font-bold">next</span> generation.
        </p>
        
      </div>
    </div>
  );
}

// About Page
function AboutPage() {
  const stats = [
    { number: "45%", text: "of Gen Z want to start their own business, yet only", color: "from-pink-500 to-pink-400" },
    { number: "1.7%", text: "of Canadian entrepreneurs are under 30, and out of them only", color: "from-cyan-500 to-cyan-400" },
    { number: "14%", text: "are minorities and", color: "from-blue-600 to-blue-500" },
    { number: "15%", text: "are women", color: "from-blue-600 to-blue-500" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl sm:text-6xl md:text-6xl font-bold bg-gradient-to-r from-[rgb(0,195,204)] to-[rgb(64,71,235)] bg-clip-text text-transparent mb-4">
          About Us
        </h1>
        <p className="text-gray-400 italic text-lg mb-12">
          Discover the mission behind the movement.
        </p>

        <div className = "grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
          <div>
        <p className="font-[Poppins] text-gray-300 text-lg leading-relaxed mb-16 max-w-4xl md:mb-5 lg:mb-16">
          A virtual innovation program, NextGen is aimed towards high-school students with entrepreneurial mindsets and characteristics. The goal is to provide enrichment opportunities around STEM and entrepreneurship, specifically targeting students who are proven leaders and passionate about learning. We want to activate the potential these youth hold, and use it to change their trajectory. A key focus is also made on empowering youth from diverse ethnicities, genders, and abilities.
        </p>
        </div>
        <div>
          <img src = "/Logo.png" className = "max-w-[35vw] mx-auto p-4"/>
        </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-10"></div>

        <h2 className="text-4xl font-bold text-white mb-8">The Stats Tell The Story: </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-900 bg-opacity-50 rounded-xl border border-gray-800">
              
              <h3 className={`text-5xl md:text-6xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{stat.text}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-16 text-center">
          Entrepreneurship is fundamental to a country&apos;s economic growth and requires a strong foundation of people behind it. This means that without young and diverse drivers of progress, Canada is likely to fall behind in the future. This is why it is imperative that an engine of progress is developed to launch the youth of today into the world of tomorrow.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Program Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              This program aims to empower marginalized yet motivated and enthusiastic teens by providing access to high-cost incubator opportunities at little to no cost. The participants will develop crucial STEM and entrepreneurial skills, preparing them to independently innovate and launch their own businesses. By targeting visible minorities and diverse gender and geographic backgrounds, we hope to foster a more inclusive tech and entrepreneurship community.
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Mission Statement</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Our mission is to address the lack of diversity in Canadian entrepreneurship by inspiring marginalized youth to enter the tech and entrepreneurial sectors. The progra&apos;s positive impact will be amplified by involving diverse mentors who serve as exemplary role models, demonstrating that success can come from any background. The goal is to spark the entrepreneurial spirit in underrepresented groups, empowering them to overcome economic barriers and improve their futures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Team Page
function TeamPage() {
  const members = [
    { name: "Ishan Gehlaut", image: "/HeadshotCropped.jpg" },
    { name: "Jeevan Sanchez", image: "Jeevan.png" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-16">
          Team
        </h1>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {members.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-800">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{member.name}</h3>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 border border-gray-800">
          <p className="text-gray-300 text-lg leading-relaxed text-center">
            As part of the NextGen initiative, we strive to organize a strong and compelling program. For Iteration 1.0, our responsibilities included publicizing the program through our networks, contacting mentors, planning the project curriculum, designing captivating lessons and interactive activities, and managing the participant experience. We gained valuable experiences in project management and leadership, and our resounding achievements have inspired us to continue its mission in the future.
          </p>
        </div>
      </div>
    </div>
  );
}

// Session Page
function SessionPage() {
  const weeks = [
    {
      title: "Week 1: Stargazing",
      date: "November 3 - November 9",
      images: [
        "/Whiteboarding.png",
        "/Jeopardy.png"
      ],
      content: "The opening session introduced the program with an orientation, detailing the schedule and key objectives. To help break the ice, we also organized activities such as a Jeopardy game with categories related to STEM and entrepreneurship. What the participants did not realize was at the time, their game groups were carefully curated based on their personalities and skills, and also were their future design challenge teams. By getting them to bond early in the program, the aim was for them to understand each other&apos;s personalities and build a more cohesive team later in the program. The second session was a whiteboarding activty, where participants used that space to articulate what drew them to NextGen and what they hoped to achieve through the program. By encouraging participants to set these goals early on, we ensured a clear path for them to follow.  The last session of the week was a lesson on how having the right mindset will augment their experience with the program. Participants were introduced to the idea that growth cannot happen when one stays in their bubble, but only when one is vulnerable. Stepping out of one&apos;s comfort zone, staying open to new ideas, and embracing challenges are essential traits for development. By fostering this mindset early on, we ensured participants would make the most of the journey that lay ahead. "
    },
    {
      title: "Week 2: Unlocking Potential",
      date: "November 10  - November 16",
      images: ["Scholarship.png", "EMindset.png"],
      content: "Our mentor, Krishiv Panchal, joined us for the second week of the program. Krishiv is a Schulich Leader studying Mechanical Engineering at York University. A Schulich Leader exemplifies an entrepreneurial spirit, which Krishiv has done through his various STEM initiatives in school and his community.  Krishiv was a perfect fit for the program, since he was not only passionate about community engagement and STEM, but also someone who can maximize the participant&apos;s innate abilities by sharing his experiences. The first session of the week was a workshop on the Entrepreneurial Mindset, where Krishiv walked the participants through key characteristics, such as risk taking, passion, creativity, and capability to innovate. He highlighted how these are key not only in starting a venture but in any workplace as well. For the second session, Krishiv recorded a video about post secondary pathways. He talked about his journey, discovering passions in high school, navigating post-secondary options, and choosing a program that aligned with his aspirations. Krishiv then discussed the diverse career pathways STEM can offer, and the countless intersections for entrepreneurial ventures. Finally, as a bonus, the last session of the week included Krishiv presenting his own lesson on writing scholarship applications. "
    },
    {
      title: "Week 3: Rocket-eering",
      date: "November 17 - November 23",
      images: [

        "/Ideation.png",
        "/DesigningProcess.png"
      ],
      content: "The third week switched gears to educating participants about STEM and market fundamentals. We kicked off the week with &apos;Tech It To The Next Level,&apos; an introduction to emerging technologies. Participants were exposed to cutting edge concepts such as quantum computing. artificial intelligence, and smart cities. The second session of the week was an Introduction to Capital Markets. This session included information about the stock-market, banking business models, and most importantly, venture capitalism.  The last session of the week included a workshop on the 6-Step Design Process, which is a cornerstone in product creation . By introducing this process, we aimed to equip the participants with a framework to efficiently find problems and create solutions. After this, participants were split into their groups and given pressing issues in the world. These groups then had to create a viable solution using the design process and present it at the next session. For example, one group was given the problem of lack of sustainable structures. As a result, they researched a groundbreaking technology called &apos;aerogel&apos; and applied that knowledge to ideate fridges with thinner walls! "
    },
    {
      title: "Week 4: T-Minus One Week",
      date: "November 24 - November 30",
      images: [
        "/MarketA.png",
        "MarketPitch.png"
      ],
      content: "The fourth week marked the final stretch before the grand finale of the program, and there was still plenty for participants to learn. We began the week with a lesson on market analysis. This is a crucial part of starting any venture, and would be an important component of the design challenge. He introduced participants to SWOT (Strengths, Weaknesses, Opportunities and Threats) analysis, which is fundamental to assessing a project&apos;s viability. The second session of  the week focused on what was arguably the most important topic in the entire program, creating an effective business pitch. Participants learnt how to deliver a compelling pitch, and afterwards, the participants were given 30 minutes to prepare a pitch to sell the products they had ideated the week prior, and to present it to their peers. Through this exercise, participants were able to test their creativity and enhance their public speaking skills. The last session of the week focused on professional development. Crafting a well-developed resume, building a network and executing interviews well provides high-schoolers the ability to excel when applying for jobs. The participants went over networking skills, building resumes, and mock-interviewing, so that the participants can feel more confident when entering professional or even post-secondary landscapes."
    },
    
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          Iteration 1.0
        </h1>
        <p className="text-gray-400 italic text-lg mb-12">November 4 2025 - December 9 2025</p>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="mb-12">
            <img src="/Chart.png" alt="Timeline" className="w-full rounded-xl max-w-7xl" />
          </div>

          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Both entrepreneurship and actualization parallel the stages of a rocket launch: fueling, ignition, and liftoff. It begins with maximizing potential energy behind an idea or a person, akin to fueling a rocket. The ignition phase signals the time when this energy translates into gaining momentum, and liftoff represents directing that momentum to reach new heights.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              This is why NextGen was split into these three distinct phases. The first two, Fueling and Ignition, centered on activation and education and were designed to run for 2 weeks each. This was to provide the participants with sufficient programming time to engage with the content at each stage. The last phase, or Liftoff, was only one week, and included the Moonshot design challenge. This design challenge was where participants got to apply their learning and channel their creativity. This shorter time frame challenged the participants to think on their feet, adapt, and work collaboratively with their peers.
            </p>


          </div>
        </div>


        <div className="space-y-16">
          {weeks.map((week, index) => (
            <div key={index} className="bg-gray-900 bg-opacity-50 rounded-xl p-8 border border-gray-800">
              <div className="h-auto min-h-0 items-start">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{week.title}</h3>
                <p className="text-blue-400 font-medium mb-6">{week.date}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 mb-6 items-start">
                <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 gap-10 order-1 lg:order-1 mx-auto my-auto">
                  {week.images.map((img, i) => (
                    <img key={i} src={img} alt={`Week ${index + 1} Activity`} className="w-full rounded-lg lg:max-w-[30vw] sm:max-w-auto" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed text-lg sm:pb-5 lg:p-0 ">{week.content}</p>
              </div>
            </div>
          ))}

          <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 border border-gray-800">
            <div className="h-auto min-h-0 items-start">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Fly Me To The Moon</h3>
              <p className="text-blue-400 font-medium mb-6">December 1 - December 7</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 mb-6 items-start">
              <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 gap-10 order-1 lg:order-1 mx-auto my-auto">
                <img src="/TeamBuilding.png" className="w-full rounded-lg lg:max-w-[30vw] sm:max-w-auto" />
              </div>

              <p className="text-gray-300 leading-relaxed text-lg ">The final week was full of excitement, as 4 intensive weeks of learning all culminated in the grand finale. Firstly, the participants were split into their groups, and performed some final team-building activities. They were encouraged to talk about their 3 biggest achievements to their groups, and their strengths and weaknesses. This activity was an efficient way to put into perspective each individual&apos;s inner workings. Finally, the participants regrouped and were given the theme for their Moonshot Challenge:</p>
            </div>

            <div className="mt-16 text-center bg-gradient-to-r from-cyan-900 to-blue-900 bg-opacity-30 rounded-xl p-8 border border-cyan-800">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
                Design Challenge Theme
              </h2>
              <p className="text-2xl text-white font-medium">
                How Do We Make Living Spaces More Sustainable?
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 mb-6 items-start  py-8">
              <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 gap-10 order-1 lg:order-1 mx-auto my-auto">
                <img src="/Moonshot.png" className="w-full rounded-lg lg:max-w-[30vw] sm:max-w-auto" />
                <img src="/Rocketalks.png" className="w-full rounded-lg lg:max-w-[30vw] sm:max-w-auto" />
              </div>

              <p className="text-gray-300 leading-relaxed text-lg ">Throughout the week, teams vigorously researched problems, analyzed markets, ideated prototypes, and created proposals. They channeled weeks of learning into seven days of innovation, and pushed their boundaries to deliver creative solutions. By the end, the groups submitted their reports and pitched their products. After an hour of deliberation, the winner was decided! Team Engines won with their innovative transparent solar panels. They were able to research and apply a groundbreaking technology called &apos;photovoltaic glass,&apos; which is able to let visible light through but can absorb and convert the rest of the light spectrum into electricity. So, the team developed a window that uses this technology and even proposed its many uses, such as on skyscrapers. An added benefit of this technology is that since less energy gets passed the window, less heat is produced a result. Their ingenuity, initiative, product&apos;s relevance to the theme, and next-level pitch made them clear winners. After the design challenge, participants took part in Rocket Talks. These Rocket Talks were one of the most memorable parts of the program, bringing the participants full circle to the start of the session. Each participant had ten minutes of speaking time to share their journey, reflecting on where they started, how they grew, and what they were taking away from the experience. This is also where the whiteboards they made at the start of the session came to life, reminding them of the goals that they aspired to achieve.</p>
            </div>


          </div>


        </div>


      </div>
    </div>
  );
}

// Get Involved Page
function GetInvolvedPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-8">
          Get Involved
        </h1>
        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-12 border border-gray-800">
          <p className="text-2xl md:text-3xl text-white font-medium mb-6">
            Applications have closed for Iteration 1.0
          </p>
          <p className="text-gray-400 text-lg">
            Stay tuned for future opportunities to join NextGen Learning!
          </p>
        </div>
      </div>
    </div>
  );
}

// Contact Page
function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-12 text-center">
          Contact Us
        </h1>

        <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 md:p-12 border border-gray-800">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Program Email</h3>
              <a
                href="mailto:nextgenincubatorcanada@gmail.com"
                className="text-blue-400 hover:text-blue-300 text-lg"
              >
                nextgenincubatorcanada@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p>&copy; 2025 NextGen Learning. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}