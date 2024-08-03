import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HexDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, decodedHex1, decodedHex2 } = location.state || {};
  const [comments, setComments] = useState('');
  const [queryData, setQueryData] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    document.title = 'Hexagram Details';
    fetchPersonalData();
    fetchQueryData();
    loadReportsFromStorage();
    document.body.style.overflow = 'hidden'; // Disable scrolling
  }, []);

  useEffect(() => {
    // Clean up on component unmount
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    };
  }, []);

  const fetchPersonalData = async () => {
    try {
      await axios.get('http://localhost:8081/personal');
    } catch (error) {
      console.error('Error fetching personal data:', error.message);
    }
  };

  const fetchQueryData = () => {
    const storedQueryData = JSON.parse(localStorage.getItem('queryData'));
    if (storedQueryData) {
      setQueryData(storedQueryData);
    }
  };

  const decodeHexagram = (hex, category, isHex2) => {
    if (isHex2) {
      hex = hex.replace(/yin changing/g, 'yin').replace(/yang changing/g, 'yang');
    }

    if (category === 'business') {
      if (hex === 'yin, yang changing, yin, yang, yang, yin changing') {
        return'qwerty';
      } else if (hex === 'yin, yin, yin, yang, yang, yang') {
        return 'werty';
      } else if (hex === 'yin changing, yin changing, yin, yang changing, yang changing, yang') {
        return 'hello';
      } else if (hex === 'yang, yang, yin, yin, yin, yang') {
        return 'wonderful!!!';
      } else if (hex === 'yang, yang, yang, yang, yang, yang') {
        return 'The creative :  Stong,active,poineering.Initiating new beginnings.';
      } else if (hex === 'yin, yin, yin, yin, yin, yin') {
        return 'The Receptive :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (hex === 'yin, yang, yin, yin, yin, yang') {
        return 'Difficulty at the Beginning :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (hex === 'yang, yin, yin, yin, yang, yin') {
        return 'YouthFul Folly :  Naiviy and immaturity lead to setbacks ';
      } else if (hex === 'yin, yang, yin, yang, yang, yang') {
        return 'Waiting (Nourishment) :  Patience and preparation lead to eventual success.';
      } else if (hex === 'yang, yang, yang, yin, yang, yin') {
        return 'Conflict: Clashes and disputes, requiring resolution and compromise.';
      } else if (hex === 'yin, yin, yin, yin, yang, yin') {
        return 'The Army: Organization and discipline bring unity and strength.';
      }  else if (hex === 'yin, yang, yin, yin, yin, yin') {
        return ' Holding Together (Union): Cooperation and harmony among diverse elements.';
      } else if (hex === 'yang, yang, yin, yang, yang, yang') {
        return '  Taming Power of the Small: Gradual progress through modest efforts.';
      } else if (hex === 'yang, yang, yang, yin, yang, yang') {
        return '  Treading (Conduct): Proceeding with caution and mindfulness.';
      } else if (hex === 'yin, yin, yin, yang, yang, yang') {
        return '  Peace: Harmony and balance, conducive to progress and prosperity.';
      } else if (hex === 'yang, yang, yang, yin, yin, yin') {
        return '  Standstill (Stagnation): A period of inertia and lack of progress.';
      } else if (hex === 'yang, yang, yang, yang, yin, yang') {
        return '  Fellowship with Men: Collaboration and shared goals bring success.';
      } else if (hex === 'yang, yin, yang, yang, yang, yang') {
        return 'Possession in Great Measure: Abundance and success achieved through diligence.';
      }  else if (hex === 'yin, yin, yin, yang, yin, yin') {
        return 'Modesty: Humility and restraint lead to inner strength and external respect.';
      } else if (hex === 'yin, yin, yang, yin, yin, yin') {
        return 'Enthusiasm: Passion and dedication drive progress and achievement.';
      } else if (hex === 'yin, yang, yang, yin, yin, yang') {
        return ' Following: Adaptability and flexibility in response to changing circumstances.';
      } else if (hex === 'yang, yin, yin, yang, yang, yin') {
        return ' Work on the Decayed (Repair): Transformation and renewal through effort and perseverance.';
      } else if (hex === 'yin, yin, yin, yin, yang, yang') {
        return ' Approach: Preparation and readiness for significant undertakings.';
      } else if (hex === 'yang, yang, yin, yin, yin, yin') {
        return 'Contemplation (View): Taking time for reflection and insight before action.';
      } else if (hex === 'yang, yin, yang, yin, yin, yang') {
        return 'Biting Through: Persistence and determination overcome obstacles.';
      } else if (hex === 'yang, yin, yin, yang, yin, yang') {
        return 'Grace: Elegance and refinement in actions and interactions.';
      } else if (hex === 'yang, yin, yin, yin, yin, yin') {
        return 'Splitting Apart: Disintegration and separation, necessitating reevaluation.';
      } else if (hex === 'yin, yin, yin, yin, yin, yang') {
        return 'Return (The Turning Point): Reversal of fortune, requiring adaptation and resilience.';
      } else if (hex === 'yang, yang, yang, yin, yin, yang') {
        return ' Innocence (The Unexpected): Openness and spontaneity lead to fortunate outcomes.';
      } else if (hex === 'yang, yin, yin, yang, yang, yang') {
        return ' Great Accumulating: Gathering resources and strength for future endeavors.';
      } else if (hex === 'yang, yin, yin, yin, yin, yang') {
        return ' Nourishment (Providing): Supporting growth and development through nurturing.';
      } else if (hex === 'yin, yang, yang, yang, yang, yin') {
        return ' Preponderance of the Great: Excess and imbalance leading to challenges.';
      } else if (hex === 'yin, yang, yin, yin, yang, yin') {
        return ' The Abysmal (Water): Danger and difficulty, requiring caution and introspection.';
      } else if (hex === 'yang, yin, yang, yang, yin, yang') {
        return 'The Clinging (Fire): Radiance and warmth, attracting attention and admiration.';
      } else if (hex === 'yin, yang, yang, yang, yin, yin') {
        return 'Influence (Courtship): Mutual attraction and harmony, fostering connection.';
      } else if (hex === 'yin, yin, yang, yang, yang, yin') {
        return 'Duration (Perseverance): Endurance and persistence through challenges.';
      } else if (hex === 'yang, yang, yang, yang, yin, yin') {
        return 'Retreat: Strategic withdrawal to preserve strength and reassess goals.';
      } else if (hex === 'yin, yin, yang, yang, yang, yang') {
        return 'The Power of the Great: Assertiveness and strength, leading to accomplishment.';
      } else if (hex === 'yang, yin, yang, yin, yin, yin') {
        return 'Progress: Gradual advancement and improvement through steady effort.';
      } else if (hex === 'yin, yin, yin, yang, yin, yang') {
        return 'Darkening of the Light: Temporary setbacks and challenges.';
      } else if (hex === 'yang, yang, yin, yang, yin, yang') {
        return'The Family (Household): Harmony and cooperation within the family or group.';
      } else if (hex === 'yang, yin, yang, yin, yang, yang') {
        return 'Opposition: Differences and conflicts that require resolution and understanding.';
      } else if (hex === 'yin, yang, yin, yang, yin, yin') {
        return 'Obstruction: Difficulties and delays, requiring perseverance and determination.';
      } else if (hex === 'yin, yin, yang, yin, yang, yin') {
        return'Deliverance: Liberation and resolution of conflicts or obstacles.';
      } else if (hex === 'yang, yin, yin, yin, yang, yang') {
        return 'Decrease: Losses or reductions that lead to necessary adjustments.';
      } else if (hex === 'yang, yang, yin, yin, yin, yang') {
        return 'Increase: Gains and improvements through strategic actions and investments.';
      } else if (hex === 'yin, yang, yang, yang, yang, yang') {
        return'Breakthrough: A decisive moment or action that leads to significant change.';
      } else if (hex === 'yang, yang, yang, yang, yang, yin') {
        return 'Coming to Meet: Synchronicity and alignment of forces, leading to mutual benefit.';
      } else if (hex === 'yin, yang, yang, yin, yin, yin') {
        return'Gathering Together (Massing): Unity and cohesion, strength in numbers.';
      } else if (hex === 'yin, yin, yin, yang, yang, yin') {
        return 'Pushing Upward: Growth and progress through persistent effort.';
      } else if (hex === 'yin, yang, yang, yin, yang, yin') {
        return ' Oppression (Exhaustion): Feeling restricted or burdened, seeking release.';
      } else if (hex === 'yin, yang, yin, yang, yang, yin') {
        return ' The Well: A source of nourishment and sustenance, providing support.';
      } else if (hex === 'yin, yang, yang, yang, yin, yang') {
        return 'Revolution (Molting): Radical change or transformation, often necessary for growth.';
      } else if (hex === 'yang, yin, yang, yang, yang, yin') {
        return' The Cauldron: Stability and balance, fostering growth and transformation.';
      } else if (hex === 'yin, yin, yang, yin, yin, yang') {
        return ' The Arousing (Shock, Thunder): Awakening and inspiration, stirring action.';
      } else if (hex === 'yang, yin, yin, yang, yin, yin') {
        return 'Keeping Still (Mountain): Pause and contemplation, seeking inner clarity.';
      } else if (hex === 'yang, yang, yin, yang, yin, yin') {
        return 'Development (Gradual Progress): Incremental growth and improvement over time.';
      } else if (hex === 'yin, yin, yang, yin, yang, yang') {
        return 'The Marrying Maiden: Union and harmony, often in relationships or partnerships.';
      } else if (hex === 'yin, yin, yang, yang, yin, yang') {
        return 'Abundance (Fullness): Prosperity and fulfillment, a time of plenty.';
      } else if (hex === 'yang, yin, yang, yang, yin, yin') {
        return 'The Wanderer: Journeys, both physical and spiritual, leading to discovery.';
      } else if (hex === 'yang, yang, yin, yang, yang, yin') {
        return 'The Gentle (Wind): Flexibility and adaptability, navigating change with grace.';
      } else if (hex === 'yin, yang, yang, yin, yang, yang') {
        return 'The Joyous (Lake): Optimism and celebration, fostering happiness and harmony.';
      } else if (hex === 'yang, yang, yin, yin, yang, yin') {
        return 'Dispersion (Dissolution): Breaking down barriers or constraints, allowing for renewal.';
      } else if (hex === 'yin, yang, yin, yin, yang, yang') {
        return ' Limitation (Articulating): Setting boundaries and constraints for focused progress.';
      } else if (hex === 'yang, yang, yin, yin, yang, yang') {
        return ' Inner Truth: Sincerity and honesty, cultivating trust and authenticity.';
      } else if (hex === 'yin, yin, yang, yang, yin, yin') {
        return 'Preponderance of the Small: Attention to detail and small matters, leading to significant outcomes.';
      } else if (hex === 'yin, yang, yin, yang, yin, yang') {
        return 'Already Fulfilled (Completion): Achieving goals and reaching fulfillment.';
      } else if (hex === 'yang, yin, yang, yin, yang, yin') {
        return 'Not Yet Fulfilled (Before Completion): Incomplete or unfinished tasks, requiring finalization or closure.';
      } 
    } else if (category === 'love') {
      if (hex === 'yin, yang changing, yin, yang, yang, yin changing') {
        return 'lovely';
      } else if (hex === 'yin, yin, yin, yang, yang, yang') {
        return 'loving';
      }else if (hex === 'yin changing, yin changing, yin, yang changing, yang changing, yang') {
        return 'Have a good day';
      } else if (hex === 'yang, yang, yin, yin, yin, yang') {
        return 'great!!!';
      } else if (hex === 'yang, yang, yang, yang, yang, yang') {
        return 'The creative :  Stong,active,poineering.Initiating new beginnings.';
      } else if (hex === 'yin, yin, yin, yin, yin, yin') {
        return 'The Receptive :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (hex === 'yin, yang, yin, yin, yin, yang') {
        return 'Difficulty at the Beginning :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (hex === 'yang, yin, yin, yin, yang, yin') {
        return 'YouthFul Folly :  Naiviy and immaturity lead to setbacks ';
      } else if (hex === 'yin, yang, yin, yang, yang, yang') {
        return 'Waiting (Nourishment) :  Patience and preparation lead to eventual success.';
      } else if (hex === 'yang, yang, yang, yin, yang, yin') {
        return 'Conflict: Clashes and disputes, requiring resolution and compromise.';
      } else if (hex === 'yin, yin, yin, yin, yang, yin') {
        return 'The Army: Organization and discipline bring unity and strength.';
      }  else if (hex === 'yin, yang, yin, yin, yin, yin') {
        return ' Holding Together (Union): Cooperation and harmony among diverse elements.';
      } else if (hex === 'yang, yang, yin, yang, yang, yang') {
        return '  Taming Power of the Small: Gradual progress through modest efforts.';
      } else if (hex === 'yang, yang, yang, yin, yang, yang') {
        return '  Treading (Conduct): Proceeding with caution and mindfulness.';
      } else if (hex === 'yin, yin, yin, yang, yang, yang') {
        return '  Peace: Harmony and balance, conducive to progress and prosperity.';
      } else if (hex === 'yang, yang, yang, yin, yin, yin') {
        return '  Standstill (Stagnation): A period of inertia and lack of progress.';
      } else if (hex === 'yang, yang, yang, yang, yin, yang') {
        return '  Fellowship with Men: Collaboration and shared goals bring success.';
      } else if (hex === 'yang, yin, yang, yang, yang, yang') {
        return 'Possession in Great Measure: Abundance and success achieved through diligence.';
      }  else if (hex === 'yin, yin, yin, yang, yin, yin') {
        return 'Modesty: Humility and restraint lead to inner strength and external respect.';
      } else if (hex === 'yin, yin, yang, yin, yin, yin') {
        return 'Enthusiasm: Passion and dedication drive progress and achievement.';
      } else if (hex === 'yin, yang, yang, yin, yin, yang') {
        return ' Following: Adaptability and flexibility in response to changing circumstances.';
      } else if (hex === 'yang, yin, yin, yang, yang, yin') {
        return ' Work on the Decayed (Repair): Transformation and renewal through effort and perseverance.';
      } else if (hex === 'yin, yin, yin, yin, yang, yang') {
        return ' Approach: Preparation and readiness for significant undertakings.';
      } else if (hex === 'yang, yang, yin, yin, yin, yin') {
        return 'Contemplation (View): Taking time for reflection and insight before action.';
      } else if (hex === 'yang, yin, yang, yin, yin, yang') {
        return 'Biting Through: Persistence and determination overcome obstacles.';
      } else if (hex === 'yang, yin, yin, yang, yin, yang') {
        return 'Grace: Elegance and refinement in actions and interactions.';
      } else if (hex === 'yang, yin, yin, yin, yin, yin') {
        return 'Splitting Apart: Disintegration and separation, necessitating reevaluation.';
      } else if (hex === 'yin, yin, yin, yin, yin, yang') {
        return 'Return (The Turning Point): Reversal of fortune, requiring adaptation and resilience.';
      } else if (hex === 'yang, yang, yang, yin, yin, yang') {
        return ' Innocence (The Unexpected): Openness and spontaneity lead to fortunate outcomes.';
      } else if (hex === 'yang, yin, yin, yang, yang, yang') {
        return ' Great Accumulating: Gathering resources and strength for future endeavors.';
      } else if (hex === 'yang, yin, yin, yin, yin, yang') {
        return ' Nourishment (Providing): Supporting growth and development through nurturing.';
      } else if (hex === 'yin, yang, yang, yang, yang, yin') {
        return ' Preponderance of the Great: Excess and imbalance leading to challenges.';
      } else if (hex === 'yin, yang, yin, yin, yang, yin') {
        return ' The Abysmal (Water): Danger and difficulty, requiring caution and introspection.';
      } else if (hex === 'yang, yin, yang, yang, yin, yang') {
        return 'The Clinging (Fire): Radiance and warmth, attracting attention and admiration.';
      } else if (hex === 'yin, yang, yang, yang, yin, yin') {
        return 'Influence (Courtship): Mutual attraction and harmony, fostering connection.';
      } else if (hex === 'yin, yin, yang, yang, yang, yin') {
        return 'Duration (Perseverance): Endurance and persistence through challenges.';
      } else if (hex === 'yang, yang, yang, yang, yin, yin') {
        return 'Retreat: Strategic withdrawal to preserve strength and reassess goals.';
      } else if (hex === 'yin, yin, yang, yang, yang, yang') {
        return 'The Power of the Great: Assertiveness and strength, leading to accomplishment.';
      } else if (hex === 'yang, yin, yang, yin, yin, yin') {
        return 'Progress: Gradual advancement and improvement through steady effort.';
      } else if (hex === 'yin, yin, yin, yang, yin, yang') {
        return'Darkening of the Light: Temporary setbacks and challenges.';
      } else if (hex === 'yang, yang, yin, yang, yin, yang') {
        return 'The Family (Household): Harmony and cooperation within the family or group.';
      } else if (hex === 'yang, yin, yang, yin, yang, yang') {
        return 'Opposition: Differences and conflicts that require resolution and understanding.';
      } else if (hex === 'yin, yang, yin, yang, yin, yin') {
        return 'Obstruction: Difficulties and delays, requiring perseverance and determination.';
      } else if (hex === 'yin, yin, yang, yin, yang, yin') {
        return'Deliverance: Liberation and resolution of conflicts or obstacles.';
      } else if (hex === 'yang, yin, yin, yin, yang, yang') {
        return'Decrease: Losses or reductions that lead to necessary adjustments.';
      } else if (hex === 'yang, yang, yin, yin, yin, yang') {
        return 'Increase: Gains and improvements through strategic actions and investments.';
      } else if (hex === 'yin, yang, yang, yang, yang, yang') {
        return 'Breakthrough: A decisive moment or action that leads to significant change.';
      } else if (hex === 'yang, yang, yang, yang, yang, yin') {
        return 'Coming to Meet: Synchronicity and alignment of forces, leading to mutual benefit.';
      } else if (hex === 'yin, yang, yang, yin, yin, yin') {
        return 'Gathering Together (Massing): Unity and cohesion, strength in numbers.';
      } else if (hex === 'yin, yin, yin, yang, yang, yin') {
        return 'Pushing Upward: Growth and progress through persistent effort.';
      } else if (hex === 'yin, yang, yang, yin, yang, yin') {
        return ' Oppression (Exhaustion): Feeling restricted or burdened, seeking release.';
      } else if (hex === 'yin, yang, yin, yang, yang, yin') {
        return ' The Well: A source of nourishment and sustenance, providing support.';
      } else if (hex === 'yin, yang, yang, yang, yin, yang') {
        return 'Revolution (Molting): Radical change or transformation, often necessary for growth.';
      } else if (hex === 'yang, yin, yang, yang, yang, yin') {
        return ' The Cauldron: Stability and balance, fostering growth and transformation.';
      } else if (hex === 'yin, yin, yang, yin, yin, yang') {
        return ' The Arousing (Shock, Thunder): Awakening and inspiration, stirring action.';
      } else if (hex === 'yang, yin, yin, yang, yin, yin') {
        return 'Keeping Still (Mountain): Pause and contemplation, seeking inner clarity.';
      } else if (hex === 'yang, yang, yin, yang, yin, yin') {
        return 'Development (Gradual Progress): Incremental growth and improvement over time.';
      } else if (hex === 'yin, yin, yang, yin, yang, yang') {
        return 'The Marrying Maiden: Union and harmony, often in relationships or partnerships.';
      } else if (hex === 'yin, yin, yang, yang, yin, yang') {
        return 'Abundance (Fullness): Prosperity and fulfillment, a time of plenty.';
      } else if (hex === 'yang, yin, yang, yang, yin, yin') {
        return 'The Wanderer: Journeys, both physical and spiritual, leading to discovery.';
      } else if (hex === 'yang, yang, yin, yang, yang, yin') {
        return 'The Gentle (Wind): Flexibility and adaptability, navigating change with grace.';
      } else if (hex === 'yin, yang, yang, yin, yang, yang') {
        return 'The Joyous (Lake): Optimism and celebration, fostering happiness and harmony.';
      } else if (hex === 'yang, yang, yin, yin, yang, yin') {
        return 'Dispersion (Dissolution): Breaking down barriers or constraints, allowing for renewal.';
      } else if (hex === 'yin, yang, yin, yin, yang, yang') {
        return ' Limitation (Articulating): Setting boundaries and constraints for focused progress.';
      } else if (hex === 'yang, yang, yin, yin, yang, yang') {
        return ' Inner Truth: Sincerity and honesty, cultivating trust and authenticity.';
      } else if (hex === 'yin, yin, yang, yang, yin, yin') {
        return 'Preponderance of the Small: Attention to detail and small matters, leading to significant outcomes.';
      } else if (hex === 'yin, yang, yin, yang, yin, yang') {
        return 'Already Fulfilled (Completion): Achieving goals and reaching fulfillment.';
      } else if (hex === 'yang, yin, yang, yin, yang, yin') {
        return 'Not Yet Fulfilled (Before Completion): Incomplete or unfinished tasks, requiring finalization or closure.';
      } 
    }   else if (category === 'general') {
      if (hex === 'yin, yang changing, yin, yang, yang, yin changing') {
        return 'lovely';
      } else if (hex === 'yin, yin, yin, yang, yang, yang') {
        return 'loving';
      }else if (hex === 'yin changing, yin changing, yin, yang changing, yang changing, yang') {
        return 'Have a good day';
      } else if (hex === 'yang, yang, yin, yin, yin, yang') {
        return 'great!!!';
      } else if (hex === 'yang, yang, yang, yang, yang, yang') {
        return 'The creative :  Stong,active,poineering.Initiating new beginnings.';
      } else if (hex === 'yin, yin, yin, yin, yin, yin') {
        return 'The Receptive :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (hex === 'yin, yang, yin, yin, yin, yang') {
        return 'Difficulty at the Beginning :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (hex === 'yang, yin, yin, yin, yang, yin') {
        return 'YouthFul Folly :  Naiviy and immaturity lead to setbacks ';
      } else if (hex === 'yin, yang, yin, yang, yang, yang') {
        return 'Waiting (Nourishment) :  Patience and preparation lead to eventual success.';
      } else if (hex === 'yang, yang, yang, yin, yang, yin') {
        return 'Conflict: Clashes and disputes, requiring resolution and compromise.';
      } else if (hex === 'yin, yin, yin, yin, yang, yin') {
        return 'The Army: Organization and discipline bring unity and strength.';
      }  else if (hex === 'yin, yang, yin, yin, yin, yin') {
        return ' Holding Together (Union): Cooperation and harmony among diverse elements.';
      } else if (hex === 'yang, yang, yin, yang, yang, yang') {
        return '  Taming Power of the Small: Gradual progress through modest efforts.';
      } else if (hex === 'yang, yang, yang, yin, yang, yang') {
        return '  Treading (Conduct): Proceeding with caution and mindfulness.';
      } else if (hex === 'yin, yin, yin, yang, yang, yang') {
        return '  Peace: Harmony and balance, conducive to progress and prosperity.';
      } else if (hex === 'yang, yang, yang, yin, yin, yin') {
        return '  Standstill (Stagnation): A period of inertia and lack of progress.';
      } else if (hex === 'yang, yang, yang, yang, yin, yang') {
        return '  Fellowship with Men: Collaboration and shared goals bring success.';
      } else if (hex === 'yang, yin, yang, yang, yang, yang') {
        return 'Possession in Great Measure: Abundance and success achieved through diligence.';
      }  else if (hex === 'yin, yin, yin, yang, yin, yin') {
        return 'Modesty: Humility and restraint lead to inner strength and external respect.';
      } else if (hex === 'yin, yin, yang, yin, yin, yin') {
        return 'Enthusiasm: Passion and dedication drive progress and achievement.';
      } else if (hex === 'yin, yang, yang, yin, yin, yang') {
        return ' Following: Adaptability and flexibility in response to changing circumstances.';
      } else if (hex === 'yang, yin, yin, yang, yang, yin') {
        return ' Work on the Decayed (Repair): Transformation and renewal through effort and perseverance.';
      } else if (hex === 'yin, yin, yin, yin, yang, yang') {
        return ' Approach: Preparation and readiness for significant undertakings.';
      } else if (hex === 'yang, yang, yin, yin, yin, yin') {
        return 'Contemplation (View): Taking time for reflection and insight before action.';
      } else if (hex === 'yang, yin, yang, yin, yin, yang') {
        return 'Biting Through: Persistence and determination overcome obstacles.';
      } else if (hex === 'yang, yin, yin, yang, yin, yang') {
        return 'Grace: Elegance and refinement in actions and interactions.';
      } else if (hex === 'yang, yin, yin, yin, yin, yin') {
        return 'Splitting Apart: Disintegration and separation, necessitating reevaluation.';
      } else if (hex === 'yin, yin, yin, yin, yin, yang') {
        return 'Return (The Turning Point): Reversal of fortune, requiring adaptation and resilience.';
      } else if (hex === 'yang, yang, yang, yin, yin, yang') {
        return ' Innocence (The Unexpected): Openness and spontaneity lead to fortunate outcomes.';
      } else if (hex === 'yang, yin, yin, yang, yang, yang') {
        return ' Great Accumulating: Gathering resources and strength for future endeavors.';
      } else if (hex === 'yang, yin, yin, yin, yin, yang') {
        return ' Nourishment (Providing): Supporting growth and development through nurturing.';
      } else if (hex === 'yin, yang, yang, yang, yang, yin') {
        return ' Preponderance of the Great: Excess and imbalance leading to challenges.';
      } else if (hex === 'yin, yang, yin, yin, yang, yin') {
        return ' The Abysmal (Water): Danger and difficulty, requiring caution and introspection.';
      } else if (hex === 'yang, yin, yang, yang, yin, yang') {
        return 'The Clinging (Fire): Radiance and warmth, attracting attention and admiration.';
      } else if (hex === 'yin, yang, yang, yang, yin, yin') {
        return 'Influence (Courtship): Mutual attraction and harmony, fostering connection.';
      } else if (hex === 'yin, yin, yang, yang, yang, yin') {
        return 'Duration (Perseverance): Endurance and persistence through challenges.';
      } else if (hex === 'yang, yang, yang, yang, yin, yin') {
        return 'Retreat: Strategic withdrawal to preserve strength and reassess goals.';
      } else if (hex === 'yin, yin, yang, yang, yang, yang') {
        return 'The Power of the Great: Assertiveness and strength, leading to accomplishment.';
      } else if (hex === 'yang, yin, yang, yin, yin, yin') {
        return 'Progress: Gradual advancement and improvement through steady effort.';
      } else if (hex === 'yin, yin, yin, yang, yin, yang') {
        return 'Darkening of the Light: Temporary setbacks and challenges.';
      } else if (hex === 'yang, yang, yin, yang, yin, yang') {
        return 'The Family (Household): Harmony and cooperation within the family or group.';
      } else if (hex === 'yang, yin, yang, yin, yang, yang') {
        return 'Opposition: Differences and conflicts that require resolution and understanding.';
      } else if (hex === 'yin, yang, yin, yang, yin, yin') {
        return 'Obstruction: Difficulties and delays, requiring perseverance and determination.';
      } else if (hex === 'yin, yin, yang, yin, yang, yin') {
        return 'Deliverance: Liberation and resolution of conflicts or obstacles.';
      } else if (hex === 'yang, yin, yin, yin, yang, yang') {
        return 'Decrease: Losses or reductions that lead to necessary adjustments.';
      } else if (hex === 'yang, yang, yin, yin, yin, yang') {
        return 'Increase: Gains and improvements through strategic actions and investments.';
      } else if (hex === 'yin, yang, yang, yang, yang, yang') {
        return 'Breakthrough: A decisive moment or action that leads to significant change.';
      } else if (hex === 'yang, yang, yang, yang, yang, yin') {
        return 'Coming to Meet: Synchronicity and alignment of forces, leading to mutual benefit.';
      } else if (hex === 'yin, yang, yang, yin, yin, yin') {
        return 'Gathering Together (Massing): Unity and cohesion, strength in numbers.';
      } else if (hex === 'yin, yin, yin, yang, yang, yin') {
        return 'Pushing Upward: Growth and progress through persistent effort.';
      } else if (hex === 'yin, yang, yang, yin, yang, yin') {
        return ' Oppression (Exhaustion): Feeling restricted or burdened, seeking release.';
      } else if (hex === 'yin, yang, yin, yang, yang, yin') {
        return ' The Well: A source of nourishment and sustenance, providing support.';
      } else if (hex === 'yin, yang, yang, yang, yin, yang') {
        return 'Revolution (Molting): Radical change or transformation, often necessary for growth.';
      } else if (hex === 'yang, yin, yang, yang, yang, yin') {
        return ' The Cauldron: Stability and balance, fostering growth and transformation.';
      } else if (hex === 'yin, yin, yang, yin, yin, yang') {
        return ' The Arousing (Shock, Thunder): Awakening and inspiration, stirring action.';
      } else if (hex === 'yang, yin, yin, yang, yin, yin') {
        return 'Keeping Still (Mountain): Pause and contemplation, seeking inner clarity.';
      } else if (hex === 'yang, yang, yin, yang, yin, yin') {
        return 'Development (Gradual Progress): Incremental growth and improvement over time.';
      } else if (hex === 'yin, yin, yang, yin, yang, yang') {
        return 'The Marrying Maiden: Union and harmony, often in relationships or partnerships.';
      } else if (hex === 'yin, yin, yang, yang, yin, yang') {
        return 'Abundance (Fullness): Prosperity and fulfillment, a time of plenty.';
      } else if (hex === 'yang, yin, yang, yang, yin, yin') {
        return 'The Wanderer: Journeys, both physical and spiritual, leading to discovery.';
      } else if (hex === 'yang, yang, yin, yang, yang, yin') {
        return 'The Gentle (Wind): Flexibility and adaptability, navigating change with grace.';
      } else if (hex === 'yin, yang, yang, yin, yang, yang') {
        return 'The Joyous (Lake): Optimism and celebration, fostering happiness and harmony.';
      } else if (hex === 'yang, yang, yin, yin, yang, yin') {
        return 'Dispersion (Dissolution): Breaking down barriers or constraints, allowing for renewal.';
      } else if (hex === 'yin, yang, yin, yin, yang, yang') {
        return ' Limitation (Articulating): Setting boundaries and constraints for focused progress.';
      } else if (hex === 'yang, yang, yin, yin, yang, yang') {
        return ' Inner Truth: Sincerity and honesty, cultivating trust and authenticity.';
      } else if (hex === 'yin, yin, yang, yang, yin, yin') {
        return 'Preponderance of the Small: Attention to detail and small matters, leading to significant outcomes.';
      } else if (hex === 'yin, yang, yin, yang, yin, yang') {
        return 'Already Fulfilled (Completion): Achieving goals and reaching fulfillment.';
      } else if (hex === 'yang, yin, yang, yin, yang, yin') {
        return 'Not Yet Fulfilled (Before Completion): Incomplete or unfinished tasks, requiring finalization or closure.';
      } 
    }


    return hex;
  };

  const messageHex1 = decodedHex1 ? decodeHexagram(decodedHex1, category, false) : '';
  const messageHex2 = decodedHex2 ? decodeHexagram(decodedHex2, category, true) : '';

  const loadReportsFromStorage = () => {
    const storedReports = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(storedReports);
  };

  const saveReportsToStorage = (newReports) => {
    localStorage.setItem('reports', JSON.stringify(newReports));
  };

  const handleSaveAndAskAnother = () => {
    const newReport = {
      query: queryData?.questions,
      currentTime: queryData?.currenttime,
      hex1: messageHex1,
      hex2: messageHex2,
      comments,
      new: true,
    };
    const newReports = [...reports, newReport];
    setReports(newReports);
    saveReportsToStorage(newReports);
    setComments('');
    navigate('/querypage');
  };

  const handleGenerateReport = () => {
    navigate('/report', {
      state: {
        category,
        decodedHex1: messageHex1,
        decodedHex2: messageHex2,
        comments,
        reports // Passing the reports state to the report page
      }
    });
  };

  return (
    <div style={{ padding: '20px', boxSizing: 'border-box', height: '100vh', overflow: 'hidden' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: 'none',
          color: '#652C8F',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
        Back
      </button>
      <h1 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '30px', marginTop: 0 }}>Hexagram Details</h1>
      <div>
        <h3>Hexagram 1:</h3>
        <p>{messageHex1}</p>
        <h3>Hexagram 2:</h3>
        <p>{messageHex2}</p>
      </div>
      <div style={{ marginTop: '20px', position: 'relative', width: '350px' }}>
        <label style={{
          position: 'absolute',
          top: '-10px',
          left: '10px',
          backgroundColor: '#f0f0f0',
          padding: '0 5px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          color: '#652C8F'
        }}>
          Enter comments:
        </label>
        <textarea
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #652C8F',
            backgroundColor: '#f0f0f0',
            fontFamily: 'Roboto, sans-serif',
            boxSizing: 'border-box',
            outline: 'none',
            resize: 'none',
          }}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          onFocus={(e) => {
            e.target.style.border = '1px solid #652C8F';
            e.target.style.backgroundColor = '#f0f0f0';
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid #652C8F';
            e.target.style.backgroundColor = '#f0f0f0';
          }}
        />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={handleGenerateReport}
          style={{
            backgroundColor: '#652C8F',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            width: '350px',
            height: '40px',
          }}
        >
          Generate Report
        </button>
        <button
          onClick={handleSaveAndAskAnother}
          style={{
            backgroundColor: '#652C8F',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            width: '350px',
            height: '40px',
          }}
        >
          Save and Ask Another Question
        </button>
      </div>
      {reports.map((report, index) => (
        <div key={index} style={{ marginTop: '200px', width: '100%' }}>
          <h2 style={{ color: report.new ? 'white' : 'black' }}>Report {index + 1}</h2>
          <div>
            <p style={{ color: report.new ? 'white' : 'black' }}><strong>Question:</strong> {report.query}</p>
            <p style={{ color: report.new ? 'white' : 'black' }}><strong>Current Time:</strong> {report.currentTime}</p>
          </div>
          <div>
            <p style={{ color: report.new ? 'white' : 'black' }}><strong>Hexagram 1:</strong> {report.hex1}</p>
            <p style={{ color: report.new ? 'white' : 'black' }}><strong>Hexagram 2:</strong> {report.hex2}</p>
          </div>
          {report.comments && (
            <div>
              <h3 style={{ color: report.new ? 'white' : 'black' }}>Comments:</h3>
              <p style={{ color: report.new ? 'white' : 'black' }}>{report.comments}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HexDetails;
