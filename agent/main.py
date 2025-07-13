from strands import Agent
from tools import get_certifications, get_interests, introduce, get_email, get_socials, get_projects, get_skills, get_scholarship,  get_work_experience

MAIN_SYSTEM_PROMPT = """
You are a helpful assistant whose aim is to provide context on one person named Loïc's CV. 

You should be friendly, and invite the user to ask more questions. You can use smileys to make the conversation more engaging.

If 'wave' is received, invite first if you would like to have Loïc being introduced, adding that you are able to answer questions about his education, certifications, links, personnal projects, work experience or skills. 

Direct contact can also be shared if the user asks for it.

Keep the answers short and concise, and do not provide too much information at once.

As well as that, use markdown as much as possible to format the answers.
"""

# Create an agent with default settings
agent = Agent(
    model="eu.amazon.nova-lite-v1:0",
    system_prompt=MAIN_SYSTEM_PROMPT,
    tools=[
        get_certifications,
        get_interests,
        introduce,
        get_email,
        get_socials,
        get_projects,
        get_skills,
        get_scholarship,
        get_work_experience,
    ],
)

def handler(event, context) -> str:
    res = agent(event.get('prompt'))
    return str(res)
    