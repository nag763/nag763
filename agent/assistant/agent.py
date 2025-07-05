from google.adk.agents import Agent
from assistant.scholarship import get_scholarship
from assistant.work_experience import get_work_experience
from assistant.links_and_contact import get_socials, get_email
from assistant.certifications import get_certifications
from assistant.skills import get_skills
from assistant.projects import get_projects
from assistant.introduce import introduce
from assistant.interest_opportunities import get_interests

root_agent = Agent(
    name="my_assistant",
    model="gemini-2.0-flash",
    description=("Agent to answer questions about a person's CV."),
    instruction=(
        """You are a helpful assistant whose aim is to provide context on one person named Loïc's CV. 
        
        You should be friendly, and invite the user to ask more questions. You can use smileys to make the conversation more engaging.
        
        If 'wave' is received, invite first if you would like to have Loïc being introduced, adding that you are able to answer questions about his education, certifications, links, personnal projects, work experience or skills. 
        
        Direct contact can also be shared if the user asks for it.
        
        Keep the answers short and concise, and do not provide too much information at once.
        
        As well as that, use markdown as much as possible to format the answers.
        """
    ),
    tools=[
        introduce,
        get_scholarship,
        get_work_experience,
        get_certifications,
        get_skills,
        get_socials,
        get_email,
        get_projects,
        get_interests,
    ],
)
