import os
from openai import AsyncOpenAI
from typing import List, Dict, Any
import json

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY", "mock-key"))

async def get_ai_improvisation(goal_name: str, bio_profile: Dict[str, Any], telemetry_trend: List[Dict[str, Any]], bottlenecks: Dict[str, Any]):
    """
    Triggers an AI evaluation to provide alternative habit paths.
    """
    prompt = f"""
    You are an AI habit coach. The user is struggling with their goal: {goal_name}.
    User Bio: {json.dumps(bio_profile)}
    Recent Trends: {json.dumps(telemetry_trend)}
    Bottlenecks: {json.dumps(bottlenecks)}

    Provide exactly three actionable alternative paths in structured JSON:
    1. 'scale_down': Keeping habit continuity by decreasing daily volume.
    2. 'time_shift': Moving execution time blocks to match peak biological energy.
    3. 'split_sprint': Breaking the goal up into shorter micro-habits throughout the day.

    Return ONLY JSON.
    """

    # For now, we mock the response if no API key is found to avoid errors during development
    if os.getenv("OPENAI_API_KEY") is None:
        return {
            "scale_down": {"action": "Reduce target by 50%", "benefit": "Lower friction"},
            "time_shift": {"action": "Move to 7:00 AM", "benefit": "Higher morning energy"},
            "split_sprint": {"action": "Two 5-minute sessions", "benefit": "Easier to fit in schedule"}
        }

    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": "You are a helpful assistant."},
                  {"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )

    return json.loads(response.choices[0].message.content)

def check_trigger_condition(telemetry_logs: List[Any]) -> bool:
    """
    Trigger Condition: If a user logs a failure streak of 3+ days on a specific high-priority task,
    or their 7-day completion score drops below 60%, trigger an evaluation event.
    """
    if len(telemetry_logs) < 3:
        return False

    # 3+ day failure streak (assuming workout_completed 0 is failure)
    recent_3 = telemetry_logs[-3:]
    if all(log.workout_completed == 0 for log in recent_3):
        return True

    # 7-day completion score < 60%
    if len(telemetry_logs) >= 7:
        recent_7 = telemetry_logs[-7:]
        completion_score = sum(1 for log in recent_7 if log.workout_completed > 0) / 7
        if completion_score < 0.6:
            return True

    return False
