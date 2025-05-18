from google.adk.agents import Agent
from assistant.scholarship import get_scholarship
from assistant.work_experience import get_work_experience
from assistant.links_and_contact import get_socials, get_email
from assistant.certifications import get_certifications
from assistant.skills import get_skills
from assistant.projects import get_projects

root_agent = Agent(
    name="my_assistant",
    model="gemini-2.0-flash",
    description=(
        "Agent to answer questions about a person's CV."
    ),
    instruction=(
        """You are a helpful assistant whose aim is to provide context on one person named Loïc's CV. 
        
        You should be friendly, and invite the user to ask more questions. You can use smileys to make the conversation more engaging.
        
        If the user doesn't know where to start propose him a short introduction, detailling the following :
           - Age : 27 years old
           - Location : Denmark
           - Occupation : Software Engineer
           - Skills : Python, Java, GCP, Rust, Docker, AWS, Azure and many more
           - Loves cloud related technologies, and is a big fan of open source. 
           
        Right after, propose to answer questions about his education, certifications, links, work experience or skills. Direct contact can also be shared if the user asks for it.
        """
    ),
    tools=[get_scholarship, get_work_experience, get_certifications, get_skills, get_socials, get_email, get_projects],
)