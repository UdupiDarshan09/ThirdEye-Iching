import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Hexagram.css';

const Hexagram = () => {
  const [lastToss, setLastToss] = useState(null);
  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState('hexagram1');
  const [messageHex1, setMessageHex1] = useState('');
  const [messageHex2, setMessageHex2] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tossResponse = await axios.get('http://localhost:8081/toss');
        const categoryResponse = await axios.get('http://localhost:8081/category');

        if (tossResponse.data.length > 0) {
          const lastTossData = tossResponse.data[tossResponse.data.length - 1];
          setLastToss(lastTossData);
        }

        if (categoryResponse.data.length > 0) {
          const categoryData = categoryResponse.data[0].category;
          setCategory(categoryData);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    if (lastToss && category) {
      const generateMessage = (modifyChangingLines) => {
        const lines = [];

        for (let i = 0; i < 6; i++) {
          let value = lastToss[`throw${i + 1}`];
          let isYin = value.includes("yin");
          let isYang = value.includes("yang");
          const isChanging = value.includes("changing");

          if (modifyChangingLines && isChanging) {
            isYin = !isYin;
            isYang = !isYang;
          }

          lines.unshift(isYin ? "yin" : "yang");
          if (isChanging) lines[0] += " changing";
        }

        const decodeHexagram = lines.join(', ');

        let combinedMessage = `${category} - ${decodeHexagram}`;
        return combinedMessage;
      };

      setMessageHex1(generateMessage(false));
      setMessageHex2(generateMessage(true));
    }
  }, [lastToss, category]);

  const renderHexagram = (modifyChangingLines, showXMark) => {
    if (!lastToss) return null;

    const lines = [];

    for (let i = 0; i < 6; i++) {
      let value = lastToss[`throw${i + 1}`];
      let isYin = value.includes("yin");
      let isYang = value.includes("yang");
      const isChanging = value.includes("changing");

      if (modifyChangingLines && isChanging) {
        isYin = !isYin;
        isYang = !isYang;
      }

      const line = (
        <div key={`line-${i}`} className={`hexagram-line${isYin ? " yin" : ""}${isYang ? " yang" : ""}`}>
          {isChanging && showXMark ? <div className="x-mark">X</div> : null}
        </div>
      );

      lines.unshift(line);
    }

    const decodeHexagram = lines.map(line => {
      if (line.props.children) {
        return line.props.children.props.children === "X" ? (line.props.className.includes("yin") ? "yin changing" : "yang changing") : (line.props.className.includes("yin") ? "yin" : "yang");
      } else {
        return line.props.className.includes("yin") ? "yin" : "yang";
      }
    }).join(', ');

    let combinedMessage = `${category} - ${decodeHexagram}`;

    if (category === 'business') {
      if (decodeHexagram === 'yin, yang changing, yin, yang, yang, yin changing') {
        combinedMessage = 'qwerty';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yang') {
        combinedMessage = 'werty';
      }
      else if (decodeHexagram === 'yin changing, yin changing, yin, yang changing, yang changing, yang') {
        combinedMessage = 'hello';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yang') {
        combinedMessage = 'wonderful!!!';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yang, yang') {
        combinedMessage = '1.The creative :  Stong,active,poineering.Initiating new beginnings.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yin, yin') {
        combinedMessage = '2.The Receptive :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yin, yang') {
        combinedMessage = '3.Difficulty at the Beginning :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yang, yin') {
        combinedMessage = '4.YouthFul Folly :  Naiviy and immaturity lead to setbacks ';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yang, yang') {
        combinedMessage = '5.Waiting (Nourishment) :  Patience and preparation lead to eventual success.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yang, yin') {
        combinedMessage = '6.Conflict: Clashes and disputes, requiring resolution and compromise.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yang, yin') {
        combinedMessage = '7.The Army: Organization and discipline bring unity and strength.';
      }  else if (decodeHexagram === 'yin, yang, yin, yin, yin, yin') {
        combinedMessage = ' 8.Holding Together (Union): Cooperation and harmony among diverse elements.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yang, yang') {
        combinedMessage = '  9.Taming Power of the Small: Gradual progress through modest efforts.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yang, yang') {
        combinedMessage = '  10.Treading (Conduct): Proceeding with caution and mindfulness.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yang') {
        combinedMessage = '  11.Peace: Harmony and balance, conducive to progress and prosperity.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yin, yin') {
        combinedMessage = '  12.Standstill (Stagnation): A period of inertia and lack of progress.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yin, yang') {
        combinedMessage = '  13.Fellowship with Men: Collaboration and shared goals bring success.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yang, yang') {
        combinedMessage = '14.Possession in Great Measure: Abundance and success achieved through diligence.';
      }  else if (decodeHexagram === 'yin, yin, yin, yang, yin, yin') {
        combinedMessage = '15.Modesty: Humility and restraint lead to inner strength and external respect.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yin, yin') {
        combinedMessage = '16.Enthusiasm: Passion and dedication drive progress and achievement.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yin, yang') {
        combinedMessage = ' 17.Following: Adaptability and flexibility in response to changing circumstances.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yang, yin') {
        combinedMessage = ' 18.Work on the Decayed (Repair): Transformation and renewal through effort and perseverance.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yang, yang') {
        combinedMessage = ' 19.Approach: Preparation and readiness for significant undertakings.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yin') {
        combinedMessage = '20.Contemplation (View): Taking time for reflection and insight before action.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yin, yang') {
        combinedMessage = '21.Biting Through: Persistence and determination overcome obstacles.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yin, yang') {
        combinedMessage = '22.Grace: Elegance and refinement in actions and interactions.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yin, yin') {
        combinedMessage = '23.Splitting Apart: Disintegration and separation, necessitating reevaluation.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yin, yang') {
        combinedMessage = '24.Return (The Turning Point): Reversal of fortune, requiring adaptation and resilience.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yin, yang') {
        combinedMessage = ' 25.Innocence (The Unexpected): Openness and spontaneity lead to fortunate outcomes.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yang, yang') {
        combinedMessage = ' 26.Great Accumulating: Gathering resources and strength for future endeavors.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yin, yang') {
        combinedMessage = ' 27.Nourishment (Providing): Supporting growth and development through nurturing.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yang, yin') {
        combinedMessage = ' 28.Preponderance of the Great: Excess and imbalance leading to challenges.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yang, yin') {
        combinedMessage = ' 29.The Abysmal (Water): Danger and difficulty, requiring caution and introspection.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yin, yang') {
        combinedMessage = '30.The Clinging (Fire): Radiance and warmth, attracting attention and admiration.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yin, yin') {
        combinedMessage = '31Influence (Courtship): Mutual attraction and harmony, fostering connection.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yang, yin') {
        combinedMessage = '32.Duration (Perseverance): Endurance and persistence through challenges.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yin, yin') {
        combinedMessage = '33.Retreat: Strategic withdrawal to preserve strength and reassess goals.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yang, yang') {
        combinedMessage = '34The Power of the Great: Assertiveness and strength, leading to accomplishment.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yin, yin') {
        combinedMessage = '35.Progress: Gradual advancement and improvement through steady effort.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yin, yang') {
        combinedMessage = '36.Darkening of the Light: Temporary setbacks and challenges.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yin, yang') {
        combinedMessage = '37.The Family (Household): Harmony and cooperation within the family or group.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yang, yang') {
        combinedMessage = '38.Opposition: Differences and conflicts that require resolution and understanding.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yin, yin') {
        combinedMessage = '39.Obstruction: Difficulties and delays, requiring perseverance and determination.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yang, yin') {
        combinedMessage = '40.Deliverance: Liberation and resolution of conflicts or obstacles.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yang, yang') {
        combinedMessage = '41.Decrease: Losses or reductions that lead to necessary adjustments.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yang') {
        combinedMessage = '42.Increase: Gains and improvements through strategic actions and investments.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yang, yang') {
        combinedMessage = '43.Breakthrough: A decisive moment or action that leads to significant change.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yang, yin') {
        combinedMessage = '44.Coming to Meet: Synchronicity and alignment of forces, leading to mutual benefit.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yin, yin') {
        combinedMessage = '45.Gathering Together (Massing): Unity and cohesion, strength in numbers.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yin') {
        combinedMessage = '46.Pushing Upward: Growth and progress through persistent effort.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yang, yin') {
        combinedMessage = '47. Oppression (Exhaustion): Feeling restricted or burdened, seeking release.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yang, yin') {
        combinedMessage = ' 48.The Well: A source of nourishment and sustenance, providing support.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yin, yang') {
        combinedMessage = '49.Revolution (Molting): Radical change or transformation, often necessary for growth.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yang, yin') {
        combinedMessage = ' 50.The Cauldron: Stability and balance, fostering growth and transformation.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yin, yang') {
        combinedMessage = ' 51.The Arousing (Shock, Thunder): Awakening and inspiration, stirring action.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yin, yin') {
        combinedMessage = '52.Keeping Still (Mountain): Pause and contemplation, seeking inner clarity.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yin, yin') {
        combinedMessage = '53.Development (Gradual Progress): Incremental growth and improvement over time.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yang, yang') {
        combinedMessage = '54.The Marrying Maiden: Union and harmony, often in relationships or partnerships.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yin, yang') {
        combinedMessage = '55.Abundance (Fullness): Prosperity and fulfillment, a time of plenty.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yin, yin') {
        combinedMessage = '56.The Wanderer: Journeys, both physical and spiritual, leading to discovery.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yang, yin') {
        combinedMessage = '57.The Gentle (Wind): Flexibility and adaptability, navigating change with grace.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yang, yang') {
        combinedMessage = '58.The Joyous (Lake): Optimism and celebration, fostering happiness and harmony.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yang, yin') {
        combinedMessage = '59.Dispersion (Dissolution): Breaking down barriers or constraints, allowing for renewal.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yang, yang') {
        combinedMessage = '60. Limitation (Articulating): Setting boundaries and constraints for focused progress.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yang, yang') {
        combinedMessage = ' 61.Inner Truth: Sincerity and honesty, cultivating trust and authenticity.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yin, yin') {
        combinedMessage = '62.Preponderance of the Small: Attention to detail and small matters, leading to significant outcomes.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yin, yang') {
        combinedMessage = '63.Already Fulfilled (Completion): Achieving goals and reaching fulfillment.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yang, yin') {
        combinedMessage = '64.Not Yet Fulfilled (Before Completion): Incomplete or unfinished tasks, requiring finalization or closure.';
      } 
    } else if (category === 'love') {
      if (decodeHexagram === 'yin, yang changing, yin, yang, yang, yin changing') {
        combinedMessage = 'lovely';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yang') {
        combinedMessage = 'loving';
      }else if (decodeHexagram === 'yin changing, yin changing, yin, yang changing, yang changing, yang') {
        combinedMessage = 'Have a good day';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yang') {
        combinedMessage = 'great!!!';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yang, yang') {
        combinedMessage = 'The creative :  Stong,active,poineering.Initiating new beginnings.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yin, yin') {
        combinedMessage = 'The Receptive :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yin, yang') {
        combinedMessage = 'Difficulty at the Beginning :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yang, yin') {
        combinedMessage = 'YouthFul Folly :  Naiviy and immaturity lead to setbacks ';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yang, yang') {
        combinedMessage = 'Waiting (Nourishment) :  Patience and preparation lead to eventual success.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yang, yin') {
        combinedMessage = 'Conflict: Clashes and disputes, requiring resolution and compromise.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yang, yin') {
        combinedMessage = 'The Army: Organization and discipline bring unity and strength.';
      }  else if (decodeHexagram === 'yin, yang, yin, yin, yin, yin') {
        combinedMessage = ' Holding Together (Union): Cooperation and harmony among diverse elements.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yang, yang') {
        combinedMessage = '  Taming Power of the Small: Gradual progress through modest efforts.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yang, yang') {
        combinedMessage = '  Treading (Conduct): Proceeding with caution and mindfulness.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yang') {
        combinedMessage = '  Peace: Harmony and balance, conducive to progress and prosperity.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yin, yin') {
        combinedMessage = '  Standstill (Stagnation): A period of inertia and lack of progress.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yin, yang') {
        combinedMessage = '  Fellowship with Men: Collaboration and shared goals bring success.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yang, yang') {
        combinedMessage = 'Possession in Great Measure: Abundance and success achieved through diligence.';
      }  else if (decodeHexagram === 'yin, yin, yin, yang, yin, yin') {
        combinedMessage = 'Modesty: Humility and restraint lead to inner strength and external respect.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yin, yin') {
        combinedMessage = 'Enthusiasm: Passion and dedication drive progress and achievement.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yin, yang') {
        combinedMessage = ' Following: Adaptability and flexibility in response to changing circumstances.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yang, yin') {
        combinedMessage = ' Work on the Decayed (Repair): Transformation and renewal through effort and perseverance.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yang, yang') {
        combinedMessage = ' Approach: Preparation and readiness for significant undertakings.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yin') {
        combinedMessage = 'Contemplation (View): Taking time for reflection and insight before action.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yin, yang') {
        combinedMessage = 'Biting Through: Persistence and determination overcome obstacles.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yin, yang') {
        combinedMessage = 'Grace: Elegance and refinement in actions and interactions.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yin, yin') {
        combinedMessage = 'Splitting Apart: Disintegration and separation, necessitating reevaluation.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yin, yang') {
        combinedMessage = 'Return (The Turning Point): Reversal of fortune, requiring adaptation and resilience.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yin, yang') {
        combinedMessage = ' Innocence (The Unexpected): Openness and spontaneity lead to fortunate outcomes.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yang, yang') {
        combinedMessage = ' Great Accumulating: Gathering resources and strength for future endeavors.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yin, yang') {
        combinedMessage = ' Nourishment (Providing): Supporting growth and development through nurturing.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yang, yin') {
        combinedMessage = ' Preponderance of the Great: Excess and imbalance leading to challenges.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yang, yin') {
        combinedMessage = ' The Abysmal (Water): Danger and difficulty, requiring caution and introspection.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yin, yang') {
        combinedMessage = 'The Clinging (Fire): Radiance and warmth, attracting attention and admiration.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yin, yin') {
        combinedMessage = 'Influence (Courtship): Mutual attraction and harmony, fostering connection.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yang, yin') {
        combinedMessage = 'Duration (Perseverance): Endurance and persistence through challenges.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yin, yin') {
        combinedMessage = 'Retreat: Strategic withdrawal to preserve strength and reassess goals.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yang, yang') {
        combinedMessage = 'The Power of the Great: Assertiveness and strength, leading to accomplishment.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yin, yin') {
        combinedMessage = 'Progress: Gradual advancement and improvement through steady effort.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yin, yang') {
        combinedMessage = 'Darkening of the Light: Temporary setbacks and challenges.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yin, yang') {
        combinedMessage = 'The Family (Household): Harmony and cooperation within the family or group.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yang, yang') {
        combinedMessage = 'Opposition: Differences and conflicts that require resolution and understanding.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yin, yin') {
        combinedMessage = 'Obstruction: Difficulties and delays, requiring perseverance and determination.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yang, yin') {
        combinedMessage = 'Deliverance: Liberation and resolution of conflicts or obstacles.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yang, yang') {
        combinedMessage = 'Decrease: Losses or reductions that lead to necessary adjustments.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yang') {
        combinedMessage = 'Increase: Gains and improvements through strategic actions and investments.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yang, yang') {
        combinedMessage = 'Breakthrough: A decisive moment or action that leads to significant change.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yang, yin') {
        combinedMessage = 'Coming to Meet: Synchronicity and alignment of forces, leading to mutual benefit.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yin, yin') {
        combinedMessage = 'Gathering Together (Massing): Unity and cohesion, strength in numbers.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yin') {
        combinedMessage = 'Pushing Upward: Growth and progress through persistent effort.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yang, yin') {
        combinedMessage = ' Oppression (Exhaustion): Feeling restricted or burdened, seeking release.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yang, yin') {
        combinedMessage = ' The Well: A source of nourishment and sustenance, providing support.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yin, yang') {
        combinedMessage = 'Revolution (Molting): Radical change or transformation, often necessary for growth.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yang, yin') {
        combinedMessage = ' The Cauldron: Stability and balance, fostering growth and transformation.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yin, yang') {
        combinedMessage = ' The Arousing (Shock, Thunder): Awakening and inspiration, stirring action.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yin, yin') {
        combinedMessage = 'Keeping Still (Mountain): Pause and contemplation, seeking inner clarity.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yin, yin') {
        combinedMessage = 'Development (Gradual Progress): Incremental growth and improvement over time.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yang, yang') {
        combinedMessage = 'The Marrying Maiden: Union and harmony, often in relationships or partnerships.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yin, yang') {
        combinedMessage = 'Abundance (Fullness): Prosperity and fulfillment, a time of plenty.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yin, yin') {
        combinedMessage = 'The Wanderer: Journeys, both physical and spiritual, leading to discovery.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yang, yin') {
        combinedMessage = 'The Gentle (Wind): Flexibility and adaptability, navigating change with grace.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yang, yang') {
        combinedMessage = 'The Joyous (Lake): Optimism and celebration, fostering happiness and harmony.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yang, yin') {
        combinedMessage = 'Dispersion (Dissolution): Breaking down barriers or constraints, allowing for renewal.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yang, yang') {
        combinedMessage = ' Limitation (Articulating): Setting boundaries and constraints for focused progress.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yang, yang') {
        combinedMessage = ' Inner Truth: Sincerity and honesty, cultivating trust and authenticity.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yin, yin') {
        combinedMessage = 'Preponderance of the Small: Attention to detail and small matters, leading to significant outcomes.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yin, yang') {
        combinedMessage = 'Already Fulfilled (Completion): Achieving goals and reaching fulfillment.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yang, yin') {
        combinedMessage = 'Not Yet Fulfilled (Before Completion): Incomplete or unfinished tasks, requiring finalization or closure.';
      } 
    }   else if (category === 'general') {
      if (decodeHexagram === 'yin, yang changing, yin, yang, yang, yin changing') {
        combinedMessage = 'lovely';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yang') {
        combinedMessage = 'loving';
      }else if (decodeHexagram === 'yin changing, yin changing, yin, yang changing, yang changing, yang') {
        combinedMessage = 'Have a good day';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yang') {
        combinedMessage = 'great!!!';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yang, yang') {
        combinedMessage = 'The creative :  Stong,active,poineering.Initiating new beginnings.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yin, yin') {
        combinedMessage = 'The Receptive :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yin, yang') {
        combinedMessage = 'Difficulty at the Beginning :  Nurturing,passive,earthy.Fostering growth and stability.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yang, yin') {
        combinedMessage = 'YouthFul Folly :  Naiviy and immaturity lead to setbacks ';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yang, yang') {
        combinedMessage = 'Waiting (Nourishment) :  Patience and preparation lead to eventual success.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yang, yin') {
        combinedMessage = 'Conflict: Clashes and disputes, requiring resolution and compromise.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yang, yin') {
        combinedMessage = 'The Army: Organization and discipline bring unity and strength.';
      }  else if (decodeHexagram === 'yin, yang, yin, yin, yin, yin') {
        combinedMessage = ' Holding Together (Union): Cooperation and harmony among diverse elements.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yang, yang') {
        combinedMessage = '  Taming Power of the Small: Gradual progress through modest efforts.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yang, yang') {
        combinedMessage = '  Treading (Conduct): Proceeding with caution and mindfulness.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yang') {
        combinedMessage = '  Peace: Harmony and balance, conducive to progress and prosperity.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yin, yin') {
        combinedMessage = '  Standstill (Stagnation): A period of inertia and lack of progress.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yin, yang') {
        combinedMessage = '  Fellowship with Men: Collaboration and shared goals bring success.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yang, yang') {
        combinedMessage = 'Possession in Great Measure: Abundance and success achieved through diligence.';
      }  else if (decodeHexagram === 'yin, yin, yin, yang, yin, yin') {
        combinedMessage = 'Modesty: Humility and restraint lead to inner strength and external respect.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yin, yin') {
        combinedMessage = 'Enthusiasm: Passion and dedication drive progress and achievement.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yin, yang') {
        combinedMessage = ' Following: Adaptability and flexibility in response to changing circumstances.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yang, yin') {
        combinedMessage = ' Work on the Decayed (Repair): Transformation and renewal through effort and perseverance.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yang, yang') {
        combinedMessage = ' Approach: Preparation and readiness for significant undertakings.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yin') {
        combinedMessage = 'Contemplation (View): Taking time for reflection and insight before action.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yin, yang') {
        combinedMessage = 'Biting Through: Persistence and determination overcome obstacles.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yin, yang') {
        combinedMessage = 'Grace: Elegance and refinement in actions and interactions.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yin, yin') {
        combinedMessage = 'Splitting Apart: Disintegration and separation, necessitating reevaluation.';
      } else if (decodeHexagram === 'yin, yin, yin, yin, yin, yang') {
        combinedMessage = 'Return (The Turning Point): Reversal of fortune, requiring adaptation and resilience.';
      } else if (decodeHexagram === 'yang, yang, yang, yin, yin, yang') {
        combinedMessage = ' Innocence (The Unexpected): Openness and spontaneity lead to fortunate outcomes.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yang, yang') {
        combinedMessage = ' Great Accumulating: Gathering resources and strength for future endeavors.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yin, yang') {
        combinedMessage = ' Nourishment (Providing): Supporting growth and development through nurturing.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yang, yin') {
        combinedMessage = ' Preponderance of the Great: Excess and imbalance leading to challenges.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yang, yin') {
        combinedMessage = ' The Abysmal (Water): Danger and difficulty, requiring caution and introspection.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yin, yang') {
        combinedMessage = 'The Clinging (Fire): Radiance and warmth, attracting attention and admiration.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yin, yin') {
        combinedMessage = 'Influence (Courtship): Mutual attraction and harmony, fostering connection.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yang, yin') {
        combinedMessage = 'Duration (Perseverance): Endurance and persistence through challenges.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yin, yin') {
        combinedMessage = 'Retreat: Strategic withdrawal to preserve strength and reassess goals.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yang, yang') {
        combinedMessage = 'The Power of the Great: Assertiveness and strength, leading to accomplishment.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yin, yin') {
        combinedMessage = 'Progress: Gradual advancement and improvement through steady effort.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yin, yang') {
        combinedMessage = 'Darkening of the Light: Temporary setbacks and challenges.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yin, yang') {
        combinedMessage = 'The Family (Household): Harmony and cooperation within the family or group.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yang, yang') {
        combinedMessage = 'Opposition: Differences and conflicts that require resolution and understanding.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yin, yin') {
        combinedMessage = 'Obstruction: Difficulties and delays, requiring perseverance and determination.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yang, yin') {
        combinedMessage = 'Deliverance: Liberation and resolution of conflicts or obstacles.';
      } else if (decodeHexagram === 'yang, yin, yin, yin, yang, yang') {
        combinedMessage = 'Decrease: Losses or reductions that lead to necessary adjustments.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yin, yang') {
        combinedMessage = 'Increase: Gains and improvements through strategic actions and investments.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yang, yang') {
        combinedMessage = 'Breakthrough: A decisive moment or action that leads to significant change.';
      } else if (decodeHexagram === 'yang, yang, yang, yang, yang, yin') {
        combinedMessage = 'Coming to Meet: Synchronicity and alignment of forces, leading to mutual benefit.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yin, yin') {
        combinedMessage = 'Gathering Together (Massing): Unity and cohesion, strength in numbers.';
      } else if (decodeHexagram === 'yin, yin, yin, yang, yang, yin') {
        combinedMessage = 'Pushing Upward: Growth and progress through persistent effort.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yang, yin') {
        combinedMessage = ' Oppression (Exhaustion): Feeling restricted or burdened, seeking release.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yang, yin') {
        combinedMessage = ' The Well: A source of nourishment and sustenance, providing support.';
      } else if (decodeHexagram === 'yin, yang, yang, yang, yin, yang') {
        combinedMessage = 'Revolution (Molting): Radical change or transformation, often necessary for growth.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yang, yin') {
        combinedMessage = ' The Cauldron: Stability and balance, fostering growth and transformation.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yin, yang') {
        combinedMessage = ' The Arousing (Shock, Thunder): Awakening and inspiration, stirring action.';
      } else if (decodeHexagram === 'yang, yin, yin, yang, yin, yin') {
        combinedMessage = 'Keeping Still (Mountain): Pause and contemplation, seeking inner clarity.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yin, yin') {
        combinedMessage = 'Development (Gradual Progress): Incremental growth and improvement over time.';
      } else if (decodeHexagram === 'yin, yin, yang, yin, yang, yang') {
        combinedMessage = 'The Marrying Maiden: Union and harmony, often in relationships or partnerships.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yin, yang') {
        combinedMessage = 'Abundance (Fullness): Prosperity and fulfillment, a time of plenty.';
      } else if (decodeHexagram === 'yang, yin, yang, yang, yin, yin') {
        combinedMessage = 'The Wanderer: Journeys, both physical and spiritual, leading to discovery.';
      } else if (decodeHexagram === 'yang, yang, yin, yang, yang, yin') {
        combinedMessage = 'The Gentle (Wind): Flexibility and adaptability, navigating change with grace.';
      } else if (decodeHexagram === 'yin, yang, yang, yin, yang, yang') {
        combinedMessage = 'The Joyous (Lake): Optimism and celebration, fostering happiness and harmony.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yang, yin') {
        combinedMessage = 'Dispersion (Dissolution): Breaking down barriers or constraints, allowing for renewal.';
      } else if (decodeHexagram === 'yin, yang, yin, yin, yang, yang') {
        combinedMessage = ' Limitation (Articulating): Setting boundaries and constraints for focused progress.';
      } else if (decodeHexagram === 'yang, yang, yin, yin, yang, yang') {
        combinedMessage = ' Inner Truth: Sincerity and honesty, cultivating trust and authenticity.';
      } else if (decodeHexagram === 'yin, yin, yang, yang, yin, yin') {
        combinedMessage = 'Preponderance of the Small: Attention to detail and small matters, leading to significant outcomes.';
      } else if (decodeHexagram === 'yin, yang, yin, yang, yin, yang') {
        combinedMessage = 'Already Fulfilled (Completion): Achieving goals and reaching fulfillment.';
      } else if (decodeHexagram === 'yang, yin, yang, yin, yang, yin') {
        combinedMessage = 'Not Yet Fulfilled (Before Completion): Incomplete or unfinished tasks, requiring finalization or closure.';
      } 
    }


    return (
      <div className="hexagram-container">
        <div className="hexagram">{lines}</div>
        <div className="combined-message">{combinedMessage}</div>
      </div>
    );
  };

  const handleViewInterpretation = () => {
    const decodedHex1 = generateDecodedHexagram(false);
    const decodedHex2 = generateDecodedHexagram(true);
    navigate('/HexDetails', { state: { category, decodedHex1, decodedHex2 } });
  };
  
  // Function to generate the decoded hexagram
  const generateDecodedHexagram = (modifyChangingLines) => {
    if (!lastToss) return '';
  
    const lines = [];
  
    for (let i = 0; i < 6; i++) {
      let value = lastToss[`throw${i + 1}`];
      let isYin = value.includes("yin");
      let isYang = value.includes("yang");
      const isChanging = value.includes("changing");
  
      if (modifyChangingLines && isChanging) {
        isYin = !isYin;
        isYang = !isYang;
      }
  
      lines.unshift(isYin ? "yin" : "yang");
      if (isChanging) lines[0] += " changing";
    }
  
    return lines.join(', ');
  };
  

  return (
    <div>
      <div>
        <button
          onClick={() => navigate('/CoinToss')}
          style={{
            backgroundColor: 'none',
            color: '#652C8F',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center', // Align the icon and text vertically
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
          Back
        </button>
      </div>
      <h1 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '30px', marginTop: 0 }}>Hexagram Generation</h1>
      <div className="tab-container">
        <span
          className={`tab ${activeTab === 'hexagram1' ? 'active' : ''}`}
          onClick={() => setActiveTab('hexagram1')}
        >
          Hexagram 1
        </span>
        <span
          className={`tab ${activeTab === 'hexagram2' ? 'active' : ''}`}
          onClick={() => setActiveTab('hexagram2')}
        >
          Hexagram 2
        </span>
        <div className={`underline ${activeTab}`}></div>
      </div>
      <div className="hexagram-content">
        {activeTab === 'hexagram1' && renderHexagram(false, true)}
        {activeTab === 'hexagram2' && renderHexagram(true, false)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={handleViewInterpretation}
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
          View Interpretation
        </button>
      </div>
    </div>
  );
};

export default Hexagram;
