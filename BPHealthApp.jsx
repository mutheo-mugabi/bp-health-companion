import React, { useState } from 'react';
import { Activity, Heart, TrendingUp, AlertCircle, Calendar, Plus, BarChart3, Apple, Leaf } from 'lucide-react';

const BPHealthApp = () => {
  const [readings, setReadings] = useState([]);
  const [newReading, setNewReading] = useState({ systolic: '', diastolic: '', date: '', time: '' });
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Sample data for demonstration
  const loadSampleData = () => {
    const sampleReadings = [
      { systolic: 145, diastolic: 92, date: '2024-11-23', time: '08:00', id: 1 },
      { systolic: 138, diastolic: 88, date: '2024-11-24', time: '08:15', id: 2 },
      { systolic: 142, diastolic: 90, date: '2024-11-25', time: '07:45', id: 3 },
      { systolic: 150, diastolic: 95, date: '2024-11-26', time: '08:30', id: 4 },
      { systolic: 135, diastolic: 85, date: '2024-11-27', time: '08:00', id: 5 },
      { systolic: 140, diastolic: 88, date: '2024-11-28', time: '08:20', id: 6 },
      { systolic: 137, diastolic: 86, date: '2024-11-29', time: '08:10', id: 7 },
    ];
    setReadings(sampleReadings);
  };

  const addReading = () => {
    if (newReading.systolic && newReading.diastolic && newReading.date && newReading.time) {
      const reading = {
        ...newReading,
        systolic: parseInt(newReading.systolic),
        diastolic: parseInt(newReading.diastolic),
        id: Date.now()
      };
      setReadings([...readings, reading]);
      setNewReading({ systolic: '', diastolic: '', date: '', time: '' });
      setShowForm(false);
    }
  };

  const getBPStatus = (systolic, diastolic) => {
    if (systolic >= 180 || diastolic >= 120) return { status: 'Crisis', color: '#dc3545', level: 'emergency' };
    if (systolic >= 140 || diastolic >= 90) return { status: 'High', color: '#ff6b6b', level: 'high' };
    if (systolic >= 130 || diastolic >= 80) return { status: 'Elevated', color: '#ffa500', level: 'moderate' };
    if (systolic >= 120 && diastolic < 80) return { status: 'Elevated', color: '#ffd93d', level: 'low' };
    return { status: 'Normal', color: '#51cf66', level: 'normal' };
  };

  const analyzeReadings = () => {
    if (readings.length < 3) {
      alert('Please add at least 3 readings for analysis');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call to Ark agents
    setTimeout(() => {
      const avgSystolic = readings.reduce((sum, r) => sum + r.systolic, 0) / readings.length;
      const avgDiastolic = readings.reduce((sum, r) => sum + r.diastolic, 0) / readings.length;
      const bpStatus = getBPStatus(avgSystolic, avgDiastolic);
      
      const mockAnalysis = {
        safety: {
          status: bpStatus.level,
          alertLevel: bpStatus.level,
          message: `Your average BP is ${Math.round(avgSystolic)}/${Math.round(avgDiastolic)}`,
          safetyScore: bpStatus.level === 'normal' ? 95 : bpStatus.level === 'low' ? 80 : bpStatus.level === 'moderate' ? 65 : 40
        },
        insights: {
          summary: `Based on your ${readings.length} readings over the past week, your blood pressure averages ${Math.round(avgSystolic)}/${Math.round(avgDiastolic)} mmHg.`,
          trends: avgSystolic > 140 ? 'Your systolic readings show a concerning pattern above recommended levels.' : 'Your readings show good stability.',
          patterns: {
            concerning: avgSystolic > 130 ? ['Consistently elevated systolic readings', 'Morning readings tend higher'] : [],
            positive: avgSystolic <= 130 ? ['Good consistency in measurements', 'Regular monitoring habit'] : ['Regular monitoring habit']
          }
        },
        recommendations: [
          {
            category: 'Sodium Reduction',
            icon: 'ðŸ§‚',
            priority: 'high',
            what: 'Reduce sodium intake to less than 1,500mg per day',
            why: 'High sodium causes your body to retain fluid, increasing blood pressure. Even a small reduction can lower BP by 5-6 mmHg.',
            how: 'Replace table salt with herbs and spices like garlic, basil, and oregano. Avoid processed foods and read nutrition labels - aim for foods with <140mg sodium per serving.',
            foods: {
              avoid: ['Canned soups', 'Deli meats', 'Frozen dinners', 'Salty snacks', 'Pickled foods'],
              embrace: ['Fresh vegetables', 'Fresh fruits', 'Unsalted nuts', 'Fresh fish', 'Homemade meals']
            }
          },
          {
            category: 'DASH Diet Adoption',
            icon: 'ðŸ¥—',
            priority: 'high',
            what: 'Follow the DASH (Dietary Approaches to Stop Hypertension) eating plan',
            why: 'The DASH diet can lower BP by 8-14 mmHg. It emphasizes nutrients that help lower blood pressure naturally.',
            how: 'Focus on 4-5 servings of vegetables, 4-5 servings of fruits, 2-3 servings of low-fat dairy, and 6-8 servings of whole grains daily.',
            foods: {
              embrace: ['Leafy greens (spinach, kale)', 'Berries', 'Bananas', 'Oatmeal', 'Greek yogurt', 'Salmon', 'Beans'],
              avoid: ['Red meat', 'Sweets', 'Sugary drinks']
            }
          },
          {
            category: 'Potassium-Rich Foods',
            icon: 'ðŸŒ',
            priority: 'medium',
            what: 'Increase potassium intake to 3,500-5,000mg daily',
            why: 'Potassium helps balance sodium levels and relaxes blood vessel walls, reducing pressure on your cardiovascular system.',
            how: 'Add one potassium-rich food to each meal. A medium banana has 422mg, a cup of spinach has 839mg, and a medium sweet potato has 542mg.',
            foods: {
              embrace: ['Bananas', 'Sweet potatoes', 'Spinach', 'Avocados', 'White beans', 'Salmon', 'Mushrooms'],
              avoid: ['Salt substitutes if you have kidney issues - consult your doctor']
            }
          },
          {
            category: 'Limit Caffeine & Alcohol',
            icon: 'â˜•',
            priority: 'medium',
            what: 'Limit caffeine to 200mg/day and alcohol to 1 drink/day',
            why: 'Caffeine can cause temporary BP spikes of 10 mmHg. Excessive alcohol consumption raises BP over time.',
            how: 'Switch to half-caff or decaf coffee. Limit to 2 cups of caffeinated beverages daily. If you drink alcohol, limit to one 5oz glass of wine or one 12oz beer per day.',
            foods: {
              embrace: ['Herbal teas', 'Water with lemon', 'Green tea (moderate caffeine)'],
              avoid: ['Energy drinks', 'Multiple cups of coffee', 'More than 1 alcoholic drink/day']
            }
          },
          {
            category: 'Increase Omega-3 Fatty Acids',
            icon: 'ðŸŸ',
            priority: 'medium',
            what: 'Eat fatty fish 2-3 times per week',
            why: 'Omega-3s reduce inflammation and help blood vessels relax, lowering BP by 2-4 mmHg on average.',
            how: 'Include salmon, mackerel, or sardines twice weekly. If you don\'t eat fish, consider walnuts, flaxseeds, or chia seeds daily.',
            foods: {
              embrace: ['Salmon', 'Mackerel', 'Sardines', 'Walnuts', 'Flaxseeds', 'Chia seeds'],
              avoid: ['Fried fish', 'Fish high in mercury if consumed too frequently']
            }
          }
        ],
        encouragement: {
          wins: readings.length >= 7 ? ['Excellent job tracking daily! Consistency is key to managing hypertension.'] : ['Great start on tracking your readings!'],
          message: 'Your commitment to monitoring your blood pressure shows you\'re taking charge of your health. Small dietary changes can make a significant difference - you\'ve got this!'
        }
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getLatestReading = () => {
    if (readings.length === 0) return null;
    return readings[readings.length - 1];
  };

  const latestReading = getLatestReading();
  const latestStatus = latestReading ? getBPStatus(latestReading.systolic, latestReading.diastolic) : null;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
            <Heart size={40} color="#667eea" />
            <h1 style={{ color: '#667eea', fontSize: '2.5rem', margin: 0 }}>BP Health Companion</h1>
          </div>
          <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>Track your blood pressure & get personalized dietary guidance</p>
          <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '5px' }}>Powered by Anthropic Ark Multi-Agent System</p>
        </div>

        {/* Latest Reading Card */}
        {latestReading && (
          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h3 style={{ color: '#555', fontSize: '1rem', margin: '0 0 8px 0' }}>Latest Reading</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
                    {latestReading.systolic}/{latestReading.diastolic}
                  </span>
                  <span style={{ color: '#666', fontSize: '1rem' }}>mmHg</span>
                </div>
                <p style={{ color: '#999', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                  {latestReading.date} at {latestReading.time}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  background: latestStatus.color, 
                  color: 'white', 
                  padding: '8px 20px', 
                  borderRadius: '20px', 
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>
                  {latestStatus.status}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '15px 25px',
              background: 'white',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#667eea';
            }}
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add Reading'}
          </button>
          
          <button 
            onClick={loadSampleData}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '15px 25px',
              background: 'white',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#667eea';
            }}
          >
            <Calendar size={20} />
            Load Sample Week
          </button>
          
          <button 
            onClick={analyzeReadings}
            disabled={readings.length < 3 || isAnalyzing}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '15px 25px',
              background: readings.length < 3 ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: readings.length < 3 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s',
              opacity: readings.length < 3 ? 0.6 : 1
            }}
          >
            <BarChart3 size={20} />
            {isAnalyzing ? 'Analyzing...' : 'Get Dietary Advice'}
          </button>
        </div>

        {/* Add Reading Form */}
        {showForm && (
          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Add New Reading</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', color: '#555', marginBottom: '5px', fontSize: '0.9rem' }}>Systolic (top number)</label>
                <input
                  type="number"
                  placeholder="120"
                  value={newReading.systolic}
                  onChange={(e) => setNewReading({...newReading, systolic: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#555', marginBottom: '5px', fontSize: '0.9rem' }}>Diastolic (bottom number)</label>
                <input
                  type="number"
                  placeholder="80"
                  value={newReading.diastolic}
                  onChange={(e) => setNewReading({...newReading, diastolic: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#555', marginBottom: '5px', fontSize: '0.9rem' }}>Date</label>
                <input
                  type="date"
                  value={newReading.date}
                  onChange={(e) => setNewReading({...newReading, date: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#555', marginBottom: '5px', fontSize: '0.9rem' }}>Time</label>
                <input
                  type="time"
                  value={newReading.time}
                  onChange={(e) => setNewReading({...newReading, time: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', fontSize: '1rem' }}
                />
              </div>
            </div>
            <button 
              onClick={addReading}
              style={{
                marginTop: '15px',
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Reading
            </button>
          </div>
        )}

        {/* Readings History */}
        {readings.length > 0 && (
          <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Your Readings ({readings.length})</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#555' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#555' }}>Time</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#555' }}>Systolic</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#555' }}>Diastolic</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#555' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading) => {
                    const status = getBPStatus(reading.systolic, reading.diastolic);
                    return (
                      <tr key={reading.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                        <td style={{ padding: '12px', color: '#333' }}>{reading.date}</td>
                        <td style={{ padding: '12px', color: '#333' }}>{reading.time}</td>
                        <td style={{ padding: '12px', color: '#333', fontWeight: 'bold' }}>{reading.systolic}</td>
                        <td style={{ padding: '12px', color: '#333', fontWeight: 'bold' }}>{reading.diastolic}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ 
                            background: status.color, 
                            color: 'white', 
                            padding: '4px 12px', 
                            borderRadius: '12px', 
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}>
                            {status.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <>
            {/* Safety Status */}
            <div style={{ 
              background: 'white', 
              padding: '25px', 
              borderRadius: '16px', 
              marginBottom: '20px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderLeft: `6px solid ${analysis.safety.alertLevel === 'emergency' ? '#dc3545' : analysis.safety.alertLevel === 'high' ? '#ff6b6b' : analysis.safety.alertLevel === 'moderate' ? '#ffa500' : '#51cf66'}`
            }}>
              <h2 style={{ color: '#667eea', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertCircle size={28} />
                Health Status
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>{analysis.safety.message}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <div>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>Safety Score: </span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>{analysis.safety.safetyScore}/100</span>
                </div>
                <div style={{ 
                  background: analysis.safety.alertLevel === 'emergency' ? '#dc3545' : analysis.safety.alertLevel === 'high' ? '#ff6b6b' : analysis.safety.alertLevel === 'moderate' ? '#ffa500' : '#51cf66',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem'
                }}>
                  {analysis.safety.status}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#667eea', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={28} />
                Your Blood Pressure Insights
              </h2>
              <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>{analysis.insights.summary}</p>
              <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>{analysis.insights.trends}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {analysis.insights.patterns.concerning.length > 0 && (
                  <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '12px', border: '2px solid #ffeaa7' }}>
                    <h4 style={{ color: '#856404', marginBottom: '10px' }}>âš ï¸ Areas to Watch</h4>
                    <ul style={{ marginLeft: '20px', lineHeight: '1.8', color: '#856404' }}>
                      {analysis.insights.patterns.concerning.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysis.insights.patterns.positive.length > 0 && (
                  <div style={{ background: '#d4edda', padding: '20px', borderRadius: '12px', border: '2px solid #c3e6cb' }}>
                    <h4 style={{ color: '#155724', marginBottom: '10px' }}>âœ… Positive Patterns</h4>
                    <ul style={{ marginLeft: '20px', lineHeight: '1.8', color: '#155724' }}>
                      {analysis.insights.patterns.positive.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Dietary Recommendations */}
            <div style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '30px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#667eea', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '2rem' }}>
                <Apple size={32} />
                Your Personalized Dietary Plan
              </h2>

              {analysis.recommendations.map((rec, index) => (
                <div key={index} style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '20px', borderLeft: `5px solid ${rec.priority === 'high' ? '#dc3545' : '#ffa500'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '2rem' }}>{rec.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: '#333', margin: 0, fontSize: '1.4rem' }}>{rec.category}</h3>
                    </div>
                    <span style={{ 
                      background: rec.priority === 'high' ? '#dc3545' : '#ffa500',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {rec.priority}
                    </span>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '8px', fontSize: '1.1rem' }}>ðŸŽ¯ What to Do</h4>
                    <p style={{ color: '#555', lineHeight: '1.7' }}>{rec.what}</p>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '8px', fontSize: '1.1rem' }}>ðŸ’¡ Why It Matters</h4>
                    <p style={{ color: '#555', lineHeight: '1.7' }}>{rec.why}</p>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '8px', fontSize: '1.1rem' }}>âœ… How to Implement</h4>
                    <p style={{ color: '#555', lineHeight: '1.7' }}>{rec.how}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}>
                    <div style={{ background: '#d4edda', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ color: '#155724', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Leaf size={18} />
                        Foods to Embrace
                      </h5>
                      <ul style={{ marginLeft: '20px', color: '#155724', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {rec.foods.embrace.map((food, i) => (
                          <li key={i}>{food}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '8px' }}>
                      <h5 style={{ color: '#721c24', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={18} />
                        Foods to Avoid
                      </h5>
                      <ul style={{ marginLeft: '20px', color: '#721c24', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {rec.foods.avoid.map((food, i) => (
                          <li key={i}>{food}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {/* Next Steps */}
              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '25px', borderRadius: '12px', color: 'white', marginTop: '25px' }}>
                <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.5rem' }}>ðŸŽ¯ Your Next Steps</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '15px' }}>
                  Start with just ONE change this week: {analysis.recommendations[0].category}. Small, consistent changes lead to lasting results.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                  Continue tracking your BP daily, and check back in one week to see your progress and get updated recommendations!
                </p>
              </div>

              {/* Encouragement */}
              <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginTop: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px', fontSize: '1.3rem' }}>ðŸ’ª You're Doing Great!</h3>
                {analysis.encouragement.wins.map((win, i) => (
                  <p key={i} style={{ color: '#51cf66', fontSize: '1.1rem', fontWeight: '600', marginBottom: '10px' }}>
                    âœ“ {win}
                  </p>
                ))}
                <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8', marginTop: '15px', fontStyle: 'italic' }}>
                  {analysis.encouragement.message}
                </p>
              </div>
            </div>

            {/* Reference Guide */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#667eea', marginBottom: '20px' }}>ðŸ“– Blood Pressure Reference Guide</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ padding: '15px', background: '#d4edda', borderRadius: '8px', border: '2px solid #51cf66' }}>
                  <h4 style={{ color: '#155724', marginBottom: '5px' }}>Normal</h4>
                  <p style={{ color: '#155724', fontWeight: 'bold', margin: 0 }}>Less than 120/80</p>
                </div>
                <div style={{ padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '2px solid #ffd93d' }}>
                  <h4 style={{ color: '#856404', marginBottom: '5px' }}>Elevated</h4>
                  <p style={{ color: '#856404', fontWeight: 'bold', margin: 0 }}>120-129/less than 80</p>
                </div>
                <div style={{ padding: '15px', background: '#ffe5e5', borderRadius: '8px', border: '2px solid #ffa500' }}>
                  <h4 style={{ color: '#8B4513', marginBottom: '5px' }}>Stage 1 High</h4>
                  <p style={{ color: '#8B4513', fontWeight: 'bold', margin: 0 }}>130-139/80-89</p>
                </div>
                <div style={{ padding: '15px', background: '#f8d7da', borderRadius: '8px', border: '2px solid #ff6b6b' }}>
                  <h4 style={{ color: '#721c24', marginBottom: '5px' }}>Stage 2 High</h4>
                  <p style={{ color: '#721c24', fontWeight: 'bold', margin: 0 }}>140+/90+</p>
                </div>
                <div style={{ padding: '15px', background: '#dc3545', borderRadius: '8px', border: '2px solid #a71d2a' }}>
                  <h4 style={{ color: 'white', marginBottom: '5px' }}>Crisis</h4>
                  <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>180+/120+</p>
                  <p style={{ color: 'white', fontSize: '0.8rem', margin: '5px 0 0 0' }}>Seek emergency care</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {readings.length === 0 && !analysis && (
          <div style={{ background: 'white', padding: '60px 30px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <Activity size={64} color="#667eea" style={{ marginBottom: '20px' }} />
            <h3 style={{ color: '#667eea', marginBottom: '15px', fontSize: '1.5rem' }}>Start Your Health Journey</h3>
            <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
              Add your first blood pressure reading or load sample data to see personalized dietary recommendations that can help stabilize your BP and improve your health.
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
            ðŸ’¡ This app uses AI agents (Safety Monitor, Data Analyzer, Nutrition Coach) working together
          </p>
          <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            Disclaimer: This is for educational purposes. Always consult your healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BPHealthApp;
