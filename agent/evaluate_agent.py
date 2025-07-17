from lambda_function import agent, MAIN_SYSTEM_PROMPT
from strands import Agent
import json
from pydantic import BaseModel


class EvaluatorResponseModel(BaseModel):
    mean_score: float
    conciseness: float
    friendliness: float
    relevance: float
    completeness: float
    tool_usage: float
    explanation: str


evaluator = Agent(
    model="eu.anthropic.claude-3-7-sonnet-20250219-v1:0",
    system_prompt=f"""
    You are an expert AI evaluator. Your job is to assess the quality of AI responses based on:
    1. Conciseness - how short responses are while being factual
    2. Relevance - how well the response addresses the query
    3. Completeness - whether all aspects of the query are addressed
    4. Tool usage - appropriate use of available tools
    5. Friendliness - how friendly the tool is in his responses
    
    Take into consideration that the agent is designed to reply about someone's CV, with the following system prompt :
    
    ```
    {MAIN_SYSTEM_PROMPT}
    ```
    
    Score each criterion from 1-5, where 1 is poor and 5 is excellent.
    Provide an overall score and brief explanation for your assessment.
""",
)


# Load test cases
with open("evaluation_cases.json", "r") as f:
    test_cases = json.load(f)

# Run evaluations
evaluation_results = []
for case in test_cases:

    # Create the agent to evaluate
    agent.messages = []
    evaluator.messages = []

    print(f"Query : {case["query"]}")

    # Get agent response
    agent_response = agent(case["query"])

    # Create evaluation prompt
    eval_prompt = f"""
    Query: {case['query']}

    Response to evaluate:
    {agent_response}

    Expected response (if available):
    {case.get('expected', 'Not provided')}

    Please evaluate the response based on mean_score, accuracy, relevance, completeness, and tool usage.
    """

    # Get evaluation
    evaluation_result = evaluator.structured_output(
        output_model=EvaluatorResponseModel, prompt=eval_prompt
    )

    # Store results
    evaluation_results.append(
        {
            "test_id": case.get("id", ""),
            "query": case["query"],
            **evaluation_result.model_dump(),
        }
    )


# Aggregate results and provide improvement suggestions
aggregation_agent = Agent(
    model="eu.anthropic.claude-3-7-sonnet-20250219-v1:0",
    system_prompt="""
        You are an expert AI performance analyst. Your job is to analyze a series of evaluation results,
        summarize the overall performance, and provide actionable guidance on how to improve the LLM's results.

        Focus on identifying patterns in the scores (accuracy, relevance, completeness, tool_usage)
        and connect them to the provided explanations.

        Based on your analysis, provide a clear and concise summary of the agent's performance and
        a list of concrete recommendations for improvement. For example, if the completeness score is low,
        suggest ways to make the agent's responses more comprehensive.
    """,
)

aggregation_prompt = f"""
Here are the evaluation results for the agent:

```
{json.dumps(evaluation_results, indent=2)}
```

Please provide:
1. A summary of the agent's overall performance, including average scores for each criterion.
2. Actionable recommendations for improving the agent's performance based on the evaluation results.
"""

aggregated_analysis = aggregation_agent(aggregation_prompt)

print("\n--- Aggregated Analysis and Recommendations ---\n")
print(aggregated_analysis)
