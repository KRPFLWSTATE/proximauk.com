import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MapPin, MessageCircle, Coffee, Music, 
  Film, Utensils, Clock, Send, Zap, Star, Crown,
  ThumbsUp, Activity, CheckCircle, Timer, Sparkles, UserPlus, Bell
} from 'lucide-react';
import { SpinTheWheel } from './SpinTheWheel';
import { TapBattle } from './TapBattle';
import { MysteryCard } from './MysteryCard';
import { GameRoulette } from './GameRoulette';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  color: string;
  online: boolean;
  joined: boolean;
}

interface Activity {
  id: string;
  icon: typeof Film;
  name: string;
  color: string;
  gradient: string;
  zoneName: string;
  zoneLocation: string;
  venues?: Venue[];
}

interface Venue {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: string;
}

interface VenueVote {
  friendId: number;
  venueId: string;
  timestamp: number;
}

interface Vote {
  friendId: number;
  activityId: string;
  timestamp: number;
}

interface Message {
  id: number;
  friendId: number;
  text: string;
  timestamp: string;
}

const FRIENDS: Friend[] = [
  { id: 1, name: 'Sarah', avatar: '👩‍🎨', color: '#ec4899', online: true, joined: false },
  { id: 2, name: 'James', avatar: '👨‍💻', color: '#3b82f6', online: true, joined: false },
  { id: 3, name: 'Emma', avatar: '📸', color: '#8b5cf6', online: true, joined: false },
  { id: 4, name: 'Marcus', avatar: '💪', color: '#10b981', online: true, joined: false },
  { id: 5, name: 'Alex', avatar: '👔', color: '#f59e0b', online: true, joined: false },
];

const ACTIVITIES: Activity[] = [
  { 
    id: 'coffee', 
    icon: Coffee, 
    name: 'Coffee', 
    color: '#FF7A00', 
    gradient: 'from-orange-500 to-amber-600',
    zoneName: 'Monmouth Coffee',
    zoneLocation: 'Borough Market, London',
    venues: [
      { id: 'monmouth', name: 'Monmouth Coffee', location: 'Borough Market', rating: 4.8, distance: '0.3 mi' },
      { id: 'workshop', name: 'Workshop Coffee', location: 'Clerkenwell', rating: 4.7, distance: '0.5 mi' },
    ]
  },
  { 
    id: 'movie', 
    icon: Film, 
    name: 'Cinema', 
    color: '#8b5cf6', 
    gradient: 'from-purple-500 to-indigo-600',
    zoneName: 'Everyman Cinema',
    zoneLocation: 'King\'s Cross, London',
    venues: [
      { id: 'everyman', name: 'Everyman Cinema', location: 'King\'s Cross', rating: 4.6, distance: '0.4 mi' },
      { id: 'curzon', name: 'Curzon Bloomsbury', location: 'Bloomsbury', rating: 4.5, distance: '0.6 mi' },
    ]
  },
  { 
    id: 'dinner', 
    icon: Utensils, 
    name: 'Dinner', 
    color: '#ef4444', 
    gradient: 'from-red-500 to-rose-600',
    zoneName: 'Dishoom',
    zoneLocation: 'Shoreditch, London',
    venues: [
      { id: 'dishoom', name: 'Dishoom', location: 'Shoreditch', rating: 4.9, distance: '0.2 mi' },
      { id: 'hoppers', name: 'Hoppers', location: 'Soho', rating: 4.7, distance: '0.7 mi' },
    ]
  },
  { 
    id: 'concert', 
    icon: Music, 
    name: 'Concert', 
    color: '#06b6d4', 
    gradient: 'from-cyan-500 to-teal-600',
    zoneName: 'Fabric',
    zoneLocation: 'Farringdon, London',
    venues: [
      { id: 'fabric', name: 'Fabric', location: 'Farringdon', rating: 4.8, distance: '0.5 mi' },
      { id: 'koko', name: 'KOKO', location: 'Camden', rating: 4.6, distance: '0.8 mi' },
    ]
  },
];

export function FriendlyMode() {
  // Scroll detection
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  // Journey stages
  const [drawBoardCreated, setDrawBoardCreated] = useState(false);
  const [creatorName, setCreatorName] = useState('Sarah');
  const [joinedFriends, setJoinedFriends] = useState<number[]>([]);
  
  const [placedActivities, setPlacedActivities] = useState<string[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [showTieBreaker, setShowTieBreaker] = useState(false);
  const [tieBreakerClicks, setTieBreakerClicks] = useState<{[key: number]: number}>({});
  const [winner, setWinner] = useState<string | null>(null);
  const [chatCreated, setChatCreated] = useState(false);
  const [chatInitialized, setChatInitialized] = useState(false); // Track if chat has been initialized to prevent duplicates
  const [showChatNotification, setShowChatNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendsInteracting, setFriendsInteracting] = useState<{[key: string]: number[]}>({});
  const [lastClicker, setLastClicker] = useState<number | null>(null);
  const [clickTimers, setClickTimers] = useState<{[key: number]: number}>({});
  const [clickStartTimes, setClickStartTimes] = useState<{[key: number]: number}>({});
  const [clickCounter, setClickCounter] = useState(0);
  const [ripples, setRipples] = useState<Array<{id: number, timestamp: number}>>([]);
  const rippleIdCounter = useRef(0);
  const messageIdCounter = useRef(100); // Start at 100 to avoid conflicts with initial messages

  // Venue voting and mini-games
  const [venueVotingActive, setVenueVotingActive] = useState(false);
  const [venueVotes, setVenueVotes] = useState<VenueVote[]>([]);
  const [venueTieDetected, setVenueTieDetected] = useState(false);
  const [tiedVenues, setTiedVenues] = useState<string[]>([]);
  const [playersReady, setPlayersReady] = useState<number[]>([]);
  const [showGameRoulette, setShowGameRoulette] = useState(false);
  const [selectedMiniGame, setSelectedMiniGame] = useState<'wheel' | 'tap' | 'mystery' | null>(null);
  const [miniGameActive, setMiniGameActive] = useState(false);
  const [finalVenue, setFinalVenue] = useState<Venue | null>(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0); // Track which game we're on (0, 1, 2)
  const [gamesCompleted, setGamesCompleted] = useState(0); // Track how many games finished
  const [gameSequenceStarted, setGameSequenceStarted] = useState(false); // Track if game sequence has started
  
  // Mini-game specific states
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [tapCounts, setTapCounts] = useState<{[key: string]: number}>({});
  const [tapBattleActive, setTapBattleActive] = useState(false);
  const [mysteryRevealed, setMysteryRevealed] = useState(false);

  // Scroll detection - trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isInView]);

  // Auto-play timeline
  useEffect(() => {
    if (!isInView) return; // Only start when section is in view

    // Reset all states when coming into view
    setDrawBoardCreated(false);
    setJoinedFriends([]);
    setPlacedActivities([]);
    setVotes([]);
    setShowTieBreaker(false);
    setTieBreakerClicks({});
    setWinner(null);
    setChatCreated(false);
    setChatInitialized(false); // Reset chat initialization flag
    setShowChatNotification(false);
    setMessages([]);
    setFriendsInteracting({});
    setLastClicker(null);
    setClickTimers({});
    setClickStartTimes({});
    setClickCounter(0);
    setRipples([]);
    setVenueVotingActive(false);
    setVenueVotes([]);
    setVenueTieDetected(false);
    setTiedVenues([]);
    setPlayersReady([]);
    setShowGameRoulette(false);
    setSelectedMiniGame(null);
    setMiniGameActive(false);
    setFinalVenue(null);
    setCurrentGameIndex(0);
    setGamesCompleted(0);
    setGameSequenceStarted(false);
    messageIdCounter.current = 100; // Reset message counter

    // Stage 1: Draw-Board Creation (0-1s)
    const timeout1 = setTimeout(() => {
      setDrawBoardCreated(true);
    }, 800);

    // Stage 2: Friends Joining (1-5s) - Slowed down
    // Sarah joins (creator)
    const timeout2 = setTimeout(() => {
      setJoinedFriends([1]);
    }, 1800);

    // James joins
    const timeout3 = setTimeout(() => {
      setJoinedFriends([1, 2]);
    }, 2800);

    // Emma joins
    const timeout4 = setTimeout(() => {
      setJoinedFriends([1, 2, 3]);
    }, 3800);

    // Alex joins (Marcus doesn't join)
    const timeout5 = setTimeout(() => {
      setJoinedFriends([1, 2, 3, 5]);
    }, 4800);

    // Stage 3: Activities Added (5-8s) - Slowed down
    // Sarah adds Coffee
    const timeout6 = setTimeout(() => {
      setPlacedActivities(['coffee']);
      setFriendsInteracting({ 'coffee': [1] });
      simulateVote(1, 'coffee'); // Sarah votes Coffee
    }, 5500);

    // James adds Movie
    const timeout7 = setTimeout(() => {
      setPlacedActivities(prev => [...prev, 'movie']);
      setFriendsInteracting(prev => ({ ...prev, 'movie': [2] }));
      simulateVote(2, 'movie'); // James votes Movie
    }, 7000);

    // Stage 4: Voting (8-12s) - Slowed down significantly
    // Emma votes Coffee
    const timeout8 = setTimeout(() => {
      simulateVote(3, 'coffee');
    }, 9000);

    // Alex votes Movie (creates 2-2 TIE!)
    const timeout9 = setTimeout(() => {
      simulateVote(5, 'movie');
    }, 11000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      clearTimeout(timeout5);
      clearTimeout(timeout6);
      clearTimeout(timeout7);
      clearTimeout(timeout8);
      clearTimeout(timeout9);
    };
  }, [isInView]);

  // Check for tie or winner
  useEffect(() => {
    if (votes.length === 4 && !winner && !showTieBreaker) { // 4 votes from 4 joined friends
      const voteCounts = votes.reduce((acc, vote) => {
        acc[vote.activityId] = (acc[vote.activityId] || 0) + 1;
        return acc;
      }, {} as {[key: string]: number});

      const maxVotes = Math.max(...Object.values(voteCounts));
      const topActivities = Object.entries(voteCounts).filter(([_, count]) => count === maxVotes);

      if (topActivities.length === 1) {
        // Clear winner
        setTimeout(() => {
          setWinner(topActivities[0][0]);
          showGroupChatNotification(topActivities[0][0]);
        }, 1000);
      } else {
        // Tie - trigger orb game
        setTimeout(() => {
          setShowTieBreaker(true);
          // Auto-play the orb game
          startOrbAutoplay();
        }, 1000);
      }
    }
  }, [votes, winner, showTieBreaker]);

  const startOrbAutoplay = () => {
    // Faster clicks - 2-3x speed increase
    const clickIntervals = [200, 300, 250, 350, 280, 400, 260, 340, 300, 380, 240, 320, 280, 360, 300];
    
    clickIntervals.forEach((delay, index) => {
      setTimeout(() => {
        // Favor Sarah to win (more clicks)
        const friendId = index < 10 ? (Math.random() > 0.4 ? 1 : 5) : (Math.random() > 0.3 ? 1 : 5);
        handleTieBreakerClick(friendId);
      }, delay * (index + 1));
    });
  };

  const simulateVote = (friendId: number, activityId: string) => {
    setVotes(prev => [...prev, { friendId, activityId, timestamp: Date.now() }]);
  };

  const handleTieBreakerClick = (friendId: number) => {
    if (!winner) {
      const newCount = (tieBreakerClicks[friendId] || 0) + 1;
      
      // Track start time on first click
      if (newCount === 1 && !clickStartTimes[friendId]) {
        setClickStartTimes(prev => ({ ...prev, [friendId]: Date.now() }));
      }
      
      setTieBreakerClicks(prev => ({
        ...prev,
        [friendId]: newCount
      }));

      // Update visual feedback and increment counter for unique keys
      setLastClicker(friendId);
      setClickCounter(prev => prev + 1);
      
      // Use ref for truly unique ripple IDs (updates synchronously)
      rippleIdCounter.current += 1;
      const uniqueRippleId = rippleIdCounter.current;
      
      // Add ripple to array with unique ID
      const newRipple = { id: uniqueRippleId, timestamp: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation completes (700ms)
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== uniqueRippleId));
      }, 700);

      // First to 10 clicks wins
      if (newCount >= 10) {
        // Calculate time taken
        const startTime = clickStartTimes[friendId] || Date.now();
        const endTime = Date.now();
        const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Convert to seconds
        setClickTimers(prev => ({ ...prev, [friendId]: parseFloat(timeTaken) }));
        
        const winningVote = votes.find(v => v.friendId === friendId);
        if (winningVote) {
          setWinner(winningVote.activityId);
          setShowTieBreaker(false);
          showGroupChatNotification(winningVote.activityId);
        }
      }
    }
  };

  const showGroupChatNotification = (activityId: string) => {
    // Prevent duplicate chat initialization
    if (chatInitialized) return;
    setChatInitialized(true);
    
    setShowChatNotification(true);
    setTimeout(() => {
      setShowChatNotification(false);
      setChatCreated(true);
      startGroupChat(activityId);
    }, 3000);
  };

  const startGroupChat = (activityId: string) => {
    // Extra safeguard: check if messages already exist
    if (messages.length > 0) {
      console.log('Chat already has messages, skipping initialization');
      return;
    }
    
    const activity = ACTIVITIES.find(a => a.id === activityId)!;
    
    const chatMessages: Message[] = [];
    
    // If there was a tie-breaker, announce the winner first
    if (showTieBreaker || Object.keys(tieBreakerClicks).length > 0) {
      const winnerFriend = FRIENDS.find(f => {
        const winningVote = votes.find(v => v.activityId === activityId);
        return winningVote && f.id === winningVote.friendId;
      });
      
      if (winnerFriend) {
        const winnerTime = clickTimers[winnerFriend.id];
        chatMessages.push({
          id: ++messageIdCounter.current,
          friendId: winnerFriend.id,
          text: `⚡ I won the tie-breaker orb game${winnerTime ? ` in ${winnerTime}s` : ''}! Let's do ${activity.name}! 🎉`,
          timestamp: 'Just now'
        });
      }
    }
    
    // Add regular chat messages
    chatMessages.push(
      { id: ++messageIdCounter.current, friendId: 1, text: `${activity.name} it is! 🎉`, timestamp: 'Just now' },
      { id: ++messageIdCounter.current, friendId: 2, text: `Perfect! Now where should we go?`, timestamp: 'Just now' },
      { id: ++messageIdCounter.current, friendId: 3, text: `Let's vote on a venue!`, timestamp: 'Just now' }
    );

    // Add messages one by one for realistic effect
    chatMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => {
          // Double-check no duplicates before adding
          if (prev.some(m => m.id === msg.id)) {
            return prev;
          }
          return [...prev, msg];
        });
      }, index * 1000);
    });

    // Start venue voting after messages
    setTimeout(() => {
      setVenueVotingActive(true);
      startVenueVoting(activityId);
    }, chatMessages.length * 1000 + 500);
  };

  const startVenueVoting = (activityId: string) => {
    const activity = ACTIVITIES.find(a => a.id === activityId)!;
    if (!activity.venues || activity.venues.length < 2) return;

    // Safeguard: check if venue voting already started
    if (venueVotes.length > 0) {
      console.log('Venue voting already in progress, skipping');
      return;
    }

    // Simulate venue votes (creating a tie for demo)
    const votingTimeline = [
      { delay: 1500, friendId: 1, venueId: activity.venues[0].id }, // Sarah votes venue 1
      { delay: 2500, friendId: 3, venueId: activity.venues[0].id }, // Emma votes venue 1
      { delay: 3500, friendId: 2, venueId: activity.venues[1].id }, // James votes venue 2
      { delay: 4500, friendId: 5, venueId: activity.venues[1].id }, // Alex votes venue 2 - TIE!
    ];

    votingTimeline.forEach(({ delay, friendId, venueId }) => {
      setTimeout(() => {
        setVenueVotes(prev => {
          // Prevent duplicate votes
          if (prev.some(v => v.friendId === friendId)) {
            return prev;
          }
          return [...prev, { friendId, venueId, timestamp: Date.now() }];
        });
      }, delay);
    });
  };

  // Detect venue voting tie
  useEffect(() => {
    if (venueVotes.length === 4 && !venueTieDetected && !finalVenue) {
      const voteCounts = venueVotes.reduce((acc, vote) => {
        acc[vote.venueId] = (acc[vote.venueId] || 0) + 1;
        return acc;
      }, {} as {[key: string]: number});

      const maxVotes = Math.max(...Object.values(voteCounts));
      const topVenues = Object.entries(voteCounts).filter(([_, count]) => count === maxVotes);

      if (topVenues.length === 1) {
        // Clear winner
        const activity = ACTIVITIES.find(a => a.id === winner)!;
        const winningVenue = activity.venues?.find(v => v.id === topVenues[0][0]);
        if (winningVenue) {
          setTimeout(() => {
            setFinalVenue(winningVenue);
            setVenueVotingActive(false);
            announceVenueWinner(winningVenue);
          }, 1000);
        }
      } else {
        // Tie - trigger mini-game
        setTimeout(() => {
          setVenueTieDetected(true);
          setTiedVenues(topVenues.map(([venueId]) => venueId));
          addTieMessage();
        }, 1000);
      }
    }
  }, [venueVotes, venueTieDetected, finalVenue, winner]);

  const addTieMessage = () => {
    messageIdCounter.current += 1;
    const tieMsg: Message = {
      id: messageIdCounter.current,
      friendId: 1,
      text: `🎮 It's a tie! Time for a mini-game to decide!`,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, tieMsg]);

    // Auto-ready players for demo
    setTimeout(() => {
      handlePlayerReady(1); // Sarah ready
    }, 1500);
    
    setTimeout(() => {
      handlePlayerReady(5); // Alex ready
    }, 2500);
  };

  const announceVenueWinner = (venue: Venue) => {
    // First message - James responds
    messageIdCounter.current += 1;
    const winnerMsg: Message = {
      id: messageIdCounter.current,
      friendId: 2,
      text: `Perfect! Let's meet at ${venue.name} 📍`,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, winnerMsg]);
    
    // Add follow-up messages for natural chat flow
    setTimeout(() => {
      messageIdCounter.current += 1;
      const msg2: Message = {
        id: messageIdCounter.current,
        friendId: 3,
        text: `See you all there in 20 mins! 🎉`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, msg2]);
    }, 1500);
    
    setTimeout(() => {
      messageIdCounter.current += 1;
      const msg3: Message = {
        id: messageIdCounter.current,
        friendId: 5,
        text: `On my way! 🚀`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, msg3]);
    }, 2500);
  };

  const getVoteCount = (activityId: string) => {
    return votes.filter(v => v.activityId === activityId).length;
  };

  const handlePlayerReady = (friendId: number) => {
    if (!playersReady.includes(friendId)) {
      setPlayersReady(prev => [...prev, friendId]);
    }
  };

  // Start game roulette when both players ready (ONLY ONCE)
  useEffect(() => {
    if (playersReady.length === 2 && !gameSequenceStarted && venueTieDetected && !finalVenue) {
      setGameSequenceStarted(true); // Mark as started to prevent re-triggering
      setTimeout(() => {
        setShowGameRoulette(true);
        spinGameRoulette(0); // Start with first game (wheel)
      }, 2500); // Increased from 500ms to 2500ms - let players see ready state
    }
  }, [playersReady, gameSequenceStarted, venueTieDetected, finalVenue]);

  const spinGameRoulette = (gameIndex: number) => {
    const games: Array<'wheel' | 'tap' | 'mystery'> = ['wheel', 'tap', 'mystery'];
    const selectedGame = games[gameIndex]; // Select game based on passed index
    
    console.log(`Starting game ${gameIndex + 1}: ${selectedGame}`);
    
    // Simulate roulette spin - increased timing for slower showcase
    setTimeout(() => {
      setSelectedMiniGame(selectedGame);
      setShowGameRoulette(false);
      
      setTimeout(() => {
        setMiniGameActive(true);
        announceGame(selectedGame);
      }, 2000); // Increased from 500ms to 2000ms - showcase the selected game
    }, 5000); // Increased from 3000ms to 5000ms - longer roulette animation
  };

  const announceGame = (game: 'wheel' | 'tap' | 'mystery') => {
    const gameNames = {
      wheel: 'Spin the Wheel of Fate',
      tap: 'Rapid-Fire Tap Battle',
      mystery: 'The Mystery Card'
    };
    
    messageIdCounter.current += 1;
    const gameMsg: Message = {
      id: messageIdCounter.current,
      friendId: 1,
      text: `🎲 Game selected: ${gameNames[game]}!`,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, gameMsg]);
  };

  const handleMiniGameComplete = (winningVenueId: string) => {
    // Guard: prevent duplicate calls
    if (!miniGameActive) {
      console.log('Game already completed, ignoring duplicate call');
      return;
    }
    
    setMiniGameActive(false);
    setSelectedMiniGame(null);
    
    const newGamesCompleted = gamesCompleted + 1;
    setGamesCompleted(newGamesCompleted);
    
    // Add completion message
    messageIdCounter.current += 1;
    const completionMsg: Message = {
      id: messageIdCounter.current,
      friendId: 1, // Sarah wins
      text: `🎉 Sarah wins game ${newGamesCompleted} of 3!`,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, completionMsg]);
    
    // Check if all 3 games are done
    if (newGamesCompleted >= 3) {
      // All games complete - Sarah chooses the venue
      messageIdCounter.current += 1;
      const finalMsg: Message = {
        id: messageIdCounter.current,
        friendId: 1, // Sarah
        text: `🏆 3 wins in a row! I choose the venue!`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, finalMsg]);
      
      // Finalize venue selection - Sarah picks first venue from the tied options
      const activity = ACTIVITIES.find(a => a.id === winner)!;
      const winningVenue = activity.venues?.find(v => v.id === tiedVenues[0]); // Sarah's choice (first tied venue)
      
      if (winningVenue) {
        setTimeout(() => {
          setFinalVenue(winningVenue);
          setVenueVotingActive(false);
          setVenueTieDetected(false); // Clear the tie state
          setPlayersReady([]); // Clear ready state
          announceVenueWinner(winningVenue);
        }, 2500);
      }
    } else {
      // Move to next game
      const nextGameIndex = newGamesCompleted; // newGamesCompleted is 1 or 2, which corresponds to the next game index
      setCurrentGameIndex(nextGameIndex);
      
      console.log(`Moving to game ${nextGameIndex + 1}`);
      
      setTimeout(() => {
        setShowGameRoulette(true);
        
        // Additional delay before spinning
        setTimeout(() => {
          spinGameRoulette(nextGameIndex); // Pass the next game index explicitly
        }, 500);
      }, 2500); // Wait before starting next game
    }
  };

  const getVoters = (activityId: string) => {
    const voterIds = votes.filter(v => v.activityId === activityId).map(v => v.friendId);
    return FRIENDS.filter(f => voterIds.includes(f.id));
  };

  const winningActivity = winner ? ACTIVITIES.find(a => a.id === winner) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Compact Vibe Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30 p-4"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white text-sm">Vibe Radar</div>
              <div className="text-xs text-gray-400">19 friends online in 4 hotspots</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-green-400 text-xs">Active Now</div>
              <div className="text-white text-lg">{FRIENDS.filter(f => f.online).length}</div>
            </div>
            <div className="text-center">
              <div className="text-emerald-400 text-xs">Top Hotspot</div>
              <div className="text-white text-lg">Shoreditch</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MASSIVE 3D Gamified Draw-Board */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-3xl border border-emerald-500/40 p-6 md:p-10 overflow-hidden"
      >
        {/* Epic background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 pointer-events-none" />
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/50 mb-4"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm">The Draw-Board</span>
            </motion.div>
            
            {/* Draw-Board Creation Message */}
            <AnimatePresence mode="wait">
              {!drawBoardCreated ? (
                <motion.div
                  key="creating"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-gray-400 text-sm"
                >
                  Initializing...
                </motion.div>
              ) : (
                <motion.div
                  key="created"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-lg border-2"
                      style={{ 
                        backgroundColor: '#ec489920',
                        borderColor: '#ec4899'
                      }}
                    >
                      👩‍🎨
                    </div>
                    <span className="text-emerald-400 text-sm">
                      {creatorName} created a Draw-Board
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-2xl md:text-3xl text-white mb-2">Saturday Night Plans</h3>
            <p className="text-gray-400 text-sm">Everyone can add & vote • Real-time sync • Zero friction</p>
          </div>

          {/* Active Friends Bar */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {FRIENDS.map((friend, index) => {
              const hasJoined = joinedFriends.includes(friend.id);
              
              return (
                <motion.div
                  key={`active-friend-${friend.id}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: hasJoined ? 1 : 0.85,
                    rotate: 0,
                    opacity: hasJoined ? 1 : 0.4
                  }}
                  transition={{ 
                    delay: 0.6 + index * 0.1, 
                    type: 'spring' 
                  }}
                  className="relative group"
                >
                  <div 
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 backdrop-blur-sm cursor-pointer transform hover:scale-110 transition-transform
                      ${!hasJoined ? 'grayscale' : ''}
                    `}
                    style={{ 
                      backgroundColor: `${friend.color}${hasJoined ? '20' : '10'}`,
                      borderColor: hasJoined ? friend.color : '#6b7280'
                    }}
                  >
                    {friend.avatar}
                  </div>
                  
                  {/* Online indicator */}
                  {friend.online && hasJoined && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Joined indicator */}
                  {hasJoined && index > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center"
                    >
                      <UserPlus className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                  
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {friend.name} {!hasJoined && '(not joined)'}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 3D Canvas with Activities */}
          <div className="relative min-h-[400px] bg-black/60 rounded-2xl border-2 border-emerald-500/30 mb-6 overflow-hidden" style={{ perspective: '1000px' }}>
            {/* 3D Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="3dgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="#10b981" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
                    <line x1="0" y1="20" x2="40" y2="20" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#3dgrid)" />
              </svg>
            </div>

            {/* Group Chat Notification Overlay */}
            <AnimatePresence>
              {showChatNotification && winningActivity && (() => {
                // Calculate stats
                const winnerFriend = FRIENDS.find(f => {
                  const winningVote = votes.find(v => v.activityId === winner);
                  return winningVote && f.id === winningVote.friendId;
                });
                const winnerTime = winnerFriend ? clickTimers[winnerFriend.id] : null;
                
                // Get all players with times, sorted by time
                const allPlayers = FRIENDS
                  .filter(f => joinedFriends.includes(f.id) && clickTimers[f.id])
                  .sort((a, b) => (clickTimers[a.id] || 999) - (clickTimers[b.id] || 999));
                
                const runnerUp = allPlayers[1];
                const totalClicks = Object.values(tieBreakerClicks).reduce((sum, count) => sum + count, 0);
                
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/70"
                  >
                    <motion.div
                      initial={{ y: 50 }}
                      animate={{ y: 0 }}
                      className="text-center max-w-md mx-auto px-4"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 0.5, repeat: 3 }}
                        className="mb-6"
                      >
                        <Bell className="w-20 h-20 mx-auto text-emerald-400" />
                      </motion.div>
                      <h3 className="text-3xl md:text-4xl text-white mb-4">
                        Group Chat Created! 🎉
                      </h3>
                      <p className="text-gray-300 text-lg mb-2">
                        {winningActivity.name} at {winningActivity.zoneName}
                      </p>
                      <p className="text-emerald-400 text-sm mb-6">
                        Saturday, 7:00 PM
                      </p>
                      
                      {/* Click Speed Stats */}
                      <div className="bg-gradient-to-br from-[#FF7A00]/20 to-[#FF7A00]/10 rounded-xl p-4 border border-[#FF7A00]/40 mb-4">
                        <div className="text-xs text-[#FF7A00] mb-3 flex items-center justify-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>TIE-BREAKER STATS</span>
                        </div>
                        
                        {winnerFriend && winnerTime && (
                          <div className="mb-3">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <Crown className="w-5 h-5 text-yellow-400" />
                              <span className="text-white">{winnerFriend.name} wins!</span>
                            </div>
                            <div className="text-2xl" style={{ color: winnerFriend.color }}>
                              {winnerTime}s ⚡
                            </div>
                            <div className="text-xs text-gray-400">10 clicks in {winnerTime} seconds</div>
                          </div>
                        )}
                        
                        {runnerUp && (
                          <div className="text-xs text-gray-400 mb-2">
                            Runner-up: {runnerUp.name} ({clickTimers[runnerUp.id]}s)
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          Total clicks: {totalClicks} • {allPlayers.length} players
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Floating Activity Cards in 3D Space */}
            <div className="relative z-10 p-8 flex flex-wrap gap-8 items-center justify-center min-h-[400px]">
              {placedActivities.map((activityId, index) => {
                const activity = ACTIVITIES.find(a => a.id === activityId);
                if (!activity) return null;
                const Icon = activity.icon;
                const voteCount = getVoteCount(activityId);
                const voters = getVoters(activityId);
                const isWinner = winner === activityId;

                return (
                  <motion.div
                    key={activityId}
                    initial={{ 
                      scale: 0, 
                      rotateY: -180,
                      z: -500,
                      opacity: 0 
                    }}
                    animate={{ 
                      scale: isWinner ? 1.2 : 1, 
                      rotateY: 0,
                      z: isWinner ? 50 : 0,
                      opacity: 1,
                      y: isWinner ? -20 : 0
                    }}
                    transition={{ 
                      type: 'spring', 
                      duration: 0.8,
                      delay: index * 0.6
                    }}
                    className="relative group cursor-pointer"
                    style={{ 
                      transformStyle: 'preserve-3d',
                    }}
                    whileHover={{ 
                      scale: isWinner ? 1.25 : 1.1, 
                      rotateY: 5,
                      z: 30,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Card Shadow (3D depth) */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl blur-2xl opacity-50"
                      style={{ 
                        backgroundColor: activity.color,
                        transform: 'translateZ(-20px)'
                      }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Main Card */}
                    <div 
                      className={`
                        relative w-32 h-32 md:w-40 md:h-40 rounded-2xl flex flex-col items-center justify-center gap-3
                        border-4 backdrop-blur-sm transition-all duration-500
                        ${isWinner ? 'border-white shadow-2xl' : ''}
                      `}
                      style={{ 
                        background: `linear-gradient(135deg, ${activity.color}40, ${activity.color}20)`,
                        borderColor: isWinner ? '#fff' : activity.color,
                        transform: 'translateZ(0)',
                        boxShadow: isWinner ? `0 20px 60px ${activity.color}80` : `0 10px 30px ${activity.color}40`
                      }}
                    >
                      <Icon className="w-12 h-12 md:w-16 md:h-16" style={{ color: activity.color }} />
                      <span className="text-white text-sm md:text-base">{activity.name}</span>

                      {/* Winner Crown */}
                      {isWinner && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2"
                        >
                          <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                        </motion.div>
                      )}

                      {/* Vote Badge */}
                      {voteCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-3 -right-3 min-w-[2.5rem] h-10 rounded-full flex items-center justify-center text-white border-2 border-black px-2"
                          style={{ backgroundColor: activity.color }}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          <span className="text-lg">{voteCount}</span>
                        </motion.div>
                      )}

                      {/* Voters Avatars */}
                      {voters.length > 0 && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex -space-x-2">
                          {voters.map(voter => (
                            <motion.div
                              key={`voter-${activityId}-${voter.id}`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-sm"
                              style={{ backgroundColor: voter.color }}
                            >
                              {voter.avatar}
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Interacting Friends Indicator */}
                      {friendsInteracting[activityId]?.length > 0 && !winner && (
                        <motion.div
                          className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Zap className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* 3D Shine Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ transform: 'translateZ(1px)' }}
                    />
                  </motion.div>
                );
              })}

              {/* Empty state hint */}
              {placedActivities.length === 0 && drawBoardCreated && (
                <div className="text-center text-gray-500 py-20">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  </motion.div>
                  <p className="text-lg">Waiting for friends to add activities...</p>
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            {votes.length > 0 && !winner && !showTieBreaker && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-full px-6 py-3 border border-emerald-500/50">
                <div className="flex items-center gap-3">
                  <Timer className="w-5 h-5 text-emerald-400" />
                  <span className="text-white text-sm">{votes.length} / 4 votes in</span>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`vote-progress-${i}`}
                        className={`w-2 h-2 rounded-full ${i < votes.length ? 'bg-emerald-400' : 'bg-gray-700'}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: i < votes.length ? 1 : 0.5 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tie-breaker Mini-Game */}
          <AnimatePresence>
            {showTieBreaker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl border-2 border-[#FF7A00]/50 p-8 md:p-12 mb-6"
                style={{ perspective: '1500px' }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="inline-block mb-4"
                  >
                    <Zap className="w-12 h-12 text-[#FF7A00]" />
                  </motion.div>
                  <h4 className="text-2xl md:text-3xl text-white mb-2">It's a 2-2 Tie! ⚡</h4>
                  <p className="text-gray-300 text-sm">Click the Proxima Orb • First to 10 clicks wins!</p>
                </div>

                {/* Central 3D Proxima Orb */}
                <div className="flex justify-center mb-8">
                  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Outer orange glow ring */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: '300px',
                        height: '300px',
                        top: '50%',
                        left: '50%',
                        marginLeft: '-150px',
                        marginTop: '-150px',
                        background: 'radial-gradient(circle, transparent 50%, #FF7A0060 70%, #FF7A0020 100%)',
                        filter: 'blur(30px)',
                      }}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Main Orb - Black with orange accents */}
                    <motion.button
                      onClick={() => {
                        const joinedFriendsList = FRIENDS.filter(f => joinedFriends.includes(f.id));
                        const randomFriend = joinedFriendsList[Math.floor(Math.random() * joinedFriendsList.length)];
                        handleTieBreakerClick(randomFriend.id);
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        const joinedFriendsList = FRIENDS.filter(f => joinedFriends.includes(f.id));
                        const randomFriend = joinedFriendsList[Math.floor(Math.random() * joinedFriendsList.length)];
                        handleTieBreakerClick(randomFriend.id);
                      }}
                      className="relative w-48 h-48 md:w-64 md:h-64 rounded-full cursor-pointer select-none touch-manipulation"
                      style={{
                        background: 'radial-gradient(circle at 35% 35%, #1a1a1a, #000000 60%)',
                        boxShadow: `
                          0 0 60px #FF7A0080,
                          inset 0 0 80px #FF7A0015,
                          inset -10px -10px 40px #00000080,
                          0 30px 60px rgba(0, 0, 0, 0.8)
                        `,
                        transformStyle: 'preserve-3d',
                        border: '3px solid #FF7A0060',
                        WebkitTapHighlightColor: 'transparent',
                      }}
                      whileTap={{ scale: 0.85 }}
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        scale: {
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }
                      }}
                    >
                      {/* Glass reflection */}
                      <div 
                        className="absolute top-6 left-10 w-16 h-16 md:w-20 md:h-20 rounded-full pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 60%)',
                          filter: 'blur(6px)',
                        }}
                      />

                      {/* Proxima Logo */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <span className="text-2xl md:text-3xl text-white" style={{ fontWeight: 700, letterSpacing: '0.1em', textShadow: '0 0 10px #FF7A00AA' }}>
                          PROXIMA
                        </span>
                      </div>

                      {/* Inner orange glow */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                        style={{
                          width: '80px',
                          height: '80px',
                          background: 'radial-gradient(circle, #FF7A00AA, #FF7A0040, transparent)',
                          marginLeft: '-40px',
                          marginTop: '-40px',
                          filter: 'blur(20px)',
                        }}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />

                      {/* 3D depth rings */}
                      {[0, 1, 2].map((layer) => (
                        <div
                          key={layer}
                          className="absolute inset-0 rounded-full border pointer-events-none"
                          style={{
                            borderColor: `#FF7A00${Math.floor(40 - layer * 10).toString(16).padStart(2, '0')}`,
                            transform: `translateZ(${-layer * 20}px) scale(${1 - layer * 0.08})`,
                          }}
                        />
                      ))}

                      {/* Orange particles */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={`orb-particle-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                          style={{
                            backgroundColor: '#FF7A00',
                            top: '50%',
                            left: '50%',
                            boxShadow: '0 0 8px #FF7A00'
                          }}
                          animate={{
                            x: [0, Math.cos(i * 90 * Math.PI / 180) * 90, 0],
                            y: [0, Math.sin(i * 90 * Math.PI / 180) * 90, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.75,
                            ease: 'easeInOut'
                          }}
                        />
                      ))}

                      {/* Click ripples - multiple can exist at once */}
                      {ripples.map(ripple => (
                        <motion.div
                          key={`ripple-${ripple.id}`}
                          className="absolute inset-0 rounded-full border-4 pointer-events-none"
                          style={{ borderColor: '#FF7A00' }}
                          initial={{ scale: 1, opacity: 0.9 }}
                          animate={{ scale: 1.6, opacity: 0 }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                        />
                      ))}
                    </motion.button>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="max-w-2xl mx-auto">
                  <div className="text-center text-gray-400 text-xs mb-4">LEADERBOARD</div>
                  <div className="grid grid-cols-4 gap-2 md:gap-4">
                    {FRIENDS
                      .filter(f => joinedFriends.includes(f.id))
                      .sort((a, b) => (tieBreakerClicks[b.id] || 0) - (tieBreakerClicks[a.id] || 0))
                      .map((friend, index) => {
                        const clickCount = tieBreakerClicks[friend.id] || 0;
                        const isLeader = index === 0 && clickCount > 0;
                        const finishTime = clickTimers[friend.id];
                        
                        return (
                          <motion.div
                            key={`leaderboard-${friend.id}`}
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {/* Crown for leader */}
                            {isLeader && (
                              <motion.div
                                className="absolute -top-6 left-1/2 -translate-x-1/2 z-10"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring' }}
                              >
                                <Crown className="w-6 h-6 text-yellow-400" />
                              </motion.div>
                            )}

                            {/* Friend card */}
                            <div
                              className={`
                                relative p-3 rounded-xl border-2 transition-all
                                ${isLeader ? 'bg-gradient-to-br scale-105' : 'bg-gray-800/50'}
                              `}
                              style={{
                                borderColor: isLeader ? friend.color : '#374151',
                                backgroundImage: isLeader 
                                  ? `linear-gradient(to bottom right, ${friend.color}30, ${friend.color}10)`
                                  : 'none'
                              }}
                            >
                              <div 
                                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-lg mb-2 border-2"
                                style={{
                                  backgroundColor: `${friend.color}30`,
                                  borderColor: friend.color
                                }}
                              >
                                {friend.avatar}
                              </div>
                              <div className="text-white text-xs text-center mb-1 truncate">
                                {friend.name}
                              </div>
                              <div 
                                className="text-center text-xl"
                                style={{ color: friend.color }}
                              >
                                {clickCount}
                              </div>
                              <div className="text-center text-xs text-gray-500">
                                / 10
                              </div>

                              {/* Finish Time */}
                              {finishTime && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center text-xs mt-1"
                                  style={{ color: friend.color }}
                                >
                                  {finishTime}s ⚡
                                </motion.div>
                              )}

                              {/* Progress bar */}
                              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: friend.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(clickCount / 10) * 100}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>

                {/* Instructions */}
                <motion.div
                  className="mt-8 text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-sm text-gray-400">
                    👆 Everyone tap the orb! Fastest clicker wins!
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Activity Palette */}
          {!winner && !showTieBreaker && (
            <div className="space-y-3">
              <div className="text-xs text-gray-400 text-center">Available Activities</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ACTIVITIES.map((activity) => {
                  const Icon = activity.icon;
                  const isPlaced = placedActivities.includes(activity.id);
                  
                  return (
                    <motion.div
                      key={activity.id}
                      className={`
                        relative p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                        ${isPlaced ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                      `}
                      style={{ 
                        backgroundColor: `${activity.color}15`,
                        borderColor: isPlaced ? '#374151' : `${activity.color}60`
                      }}
                      whileHover={!isPlaced ? { borderColor: activity.color } : {}}
                    >
                      <Icon className="w-8 h-8" style={{ color: activity.color }} />
                      <span className="text-xs text-gray-300">{activity.name}</span>
                      {isPlaced && (
                        <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-green-400" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Live Group Chat */}
      <AnimatePresence>
        {chatCreated && winningActivity && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl border border-emerald-500/40 overflow-hidden"
          >
            {/* Chat Header */}
            <div 
              className="px-6 py-4 border-b border-gray-800 bg-gradient-to-r"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${winningActivity.color}20, ${winningActivity.color}10)`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${winningActivity.color}30` }}
                  >
                    <winningActivity.icon 
                      className="w-6 h-6"
                      style={{ color: winningActivity.color }}
                    />
                  </motion.div>
                  <div>
                    <div className="text-white flex items-center gap-2">
                      {winningActivity.name}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </motion.div>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {winningActivity.zoneLocation} • Connected to Zone
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span className="text-white text-sm">{joinedFriends.length}</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar space-y-4">
              {messages.map((message) => {
                const friend = FRIENDS.find(f => f.id === message.friendId)!;
                const isZoneMessage = message.text.includes('📍');
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                      style={{ 
                        backgroundColor: `${friend.color}30`,
                        borderColor: friend.color
                      }}
                    >
                      <span className="text-lg">{friend.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm">{friend.name}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div 
                        className={`
                          inline-block px-4 py-2 rounded-xl max-w-[80%]
                          ${isZoneMessage 
                            ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/50' 
                            : 'bg-gray-800'
                          }
                        `}
                      >
                        <p className="text-gray-200 text-sm">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {messages.length > 0 && messages.length < 8 && !venueVotingActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-gray-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-500 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span>Someone is typing...</span>
                </motion.div>
              )}

              {/* Venue Voting UI */}
              {venueVotingActive && !venueTieDetected && winningActivity?.venues && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border-2 border-emerald-500/30"
                >
                  <div className="text-center mb-4">
                    <h4 className="text-white text-lg mb-1">📍 Vote for a Venue</h4>
                    <p className="text-gray-400 text-sm">Where should we meet?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {winningActivity.venues.map((venue) => {
                      const voteCount = venueVotes.filter(v => v.venueId === venue.id).length;
                      const voters = venueVotes
                        .filter(v => v.venueId === venue.id)
                        .map(v => FRIENDS.find(f => f.id === v.friendId))
                        .filter(Boolean);

                      return (
                        <motion.div
                          key={venue.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative p-4 rounded-xl border-2 bg-gradient-to-br from-gray-800 to-gray-900"
                          style={{ borderColor: voteCount > 0 ? winningActivity.color : '#4b5563' }}
                        >
                          <div className="text-white font-bold mb-1">{venue.name}</div>
                          <div className="text-gray-400 text-sm mb-2 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {venue.location} • {venue.distance}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-white text-sm">{venue.rating}</span>
                          </div>

                          {/* Vote count badge */}
                          {voteCount > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center border-2 border-black"
                              style={{ backgroundColor: winningActivity.color }}
                            >
                              <span className="text-white font-bold">{voteCount}</span>
                            </motion.div>
                          )}

                          {/* Voters */}
                          {voters.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {voters.map((voter, voterIndex) => voter && (
                                <div
                                  key={`venue-voter-${venue.id}-${voter.id}-${voterIndex}`}
                                  className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-xs"
                                  style={{ backgroundColor: voter.color }}
                                >
                                  {voter.avatar}
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Tie Detected - Ready System */}
              {venueTieDetected && !showGameRoulette && !miniGameActive && !finalVenue && winningActivity?.venues && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border-2 border-red-500/50"
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">⚔️</div>
                    <h4 className="text-white text-xl mb-1">Venue Tie Detected!</h4>
                    <p className="text-gray-300 text-sm">Tied participants must ready up for a mini-game</p>
                  </div>

                  <div className="flex justify-center gap-6 mb-4">
                    {[1, 5].map((friendId) => {
                      const friend = FRIENDS.find(f => f.id === friendId)!;
                      const isReady = playersReady.includes(friendId);

                      return (
                        <motion.div
                          key={`ready-${friendId}`}
                          className="text-center"
                        >
                          <div
                            className="w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl mb-2 mx-auto"
                            style={{
                              borderColor: isReady ? '#10b981' : friend.color,
                              backgroundColor: `${friend.color}30`
                            }}
                          >
                            {isReady ? '✓' : friend.avatar}
                          </div>
                          <div className="text-white text-sm mb-2">{friend.name}</div>
                          
                          {!isReady && (
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-xs text-gray-400"
                            >
                              Waiting...
                            </motion.div>
                          )}
                          {isReady && (
                            <div className="text-xs text-emerald-400 font-bold">READY!</div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="text-center text-gray-400 text-sm">
                    {playersReady.length}/2 players ready
                  </div>

                  {playersReady.length === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mt-4 text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.8, repeat: 2 }}
                        className="text-emerald-400 text-lg mb-2"
                      >
                        ✨ All Players Ready! ✨
                      </motion.div>
                      <div className="text-gray-300 text-sm">Selecting mini-game...</div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Game Roulette */}
              {showGameRoulette && (
                <motion.div
                  key={`roulette-${currentGameIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <GameRoulette 
                    onComplete={() => {}} 
                    targetGame={(['wheel', 'tap', 'mystery'] as const)[currentGameIndex]}
                  />
                </motion.div>
              )}

              {/* Game Showcase - Display selected game before it starts */}
              {!showGameRoulette && selectedMiniGame && !miniGameActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 py-12 px-6"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                      className="mb-6"
                    >
                      <div className="text-8xl mb-4">
                        {selectedMiniGame === 'wheel' && '🎡'}
                        {selectedMiniGame === 'tap' && '⚡'}
                        {selectedMiniGame === 'mystery' && '🎴'}
                      </div>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl text-white mb-3"
                      style={{
                        textShadow: '0 0 20px rgba(255, 122, 0, 0.5)',
                      }}
                    >
                      {selectedMiniGame === 'wheel' && 'Wheel of Fate'}
                      {selectedMiniGame === 'tap' && 'Tap Battle'}
                      {selectedMiniGame === 'mystery' && 'Mystery Card'}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-300 text-lg"
                    >
                      Get ready...
                    </motion.p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'linear' }}
                      className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto max-w-xs"
                      style={{ boxShadow: '0 0 10px #FF7A00' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Mini-Games */}
              {miniGameActive && selectedMiniGame && winningActivity?.venues && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  {selectedMiniGame === 'wheel' && (
                    <SpinTheWheel
                      key={`wheel-${currentGameIndex}`}
                      venues={winningActivity.venues.filter(v => tiedVenues.includes(v.id))}
                      onComplete={handleMiniGameComplete}
                      color={winningActivity.color}
                    />
                  )}
                  {selectedMiniGame === 'tap' && (
                    <TapBattle
                      key={`tap-${currentGameIndex}`}
                      venues={winningActivity.venues.filter(v => tiedVenues.includes(v.id))}
                      onComplete={handleMiniGameComplete}
                      color={winningActivity.color}
                    />
                  )}
                  {selectedMiniGame === 'mystery' && (
                    <MysteryCard
                      key={`mystery-${currentGameIndex}`}
                      venues={winningActivity.venues.filter(v => tiedVenues.includes(v.id))}
                      onComplete={handleMiniGameComplete}
                      color={winningActivity.color}
                    />
                  )}
                </motion.div>
              )}
            </div>

            {/* Message Input */}
            <div className="px-6 py-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Add to the conversation..."
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Success Footer */}
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-t border-emerald-500/30">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Plan locked in • Zero organizing friction</span>
                </div>
                <div className="text-gray-400">
                  Saturday, 7:00 PM
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared History */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-teal-500/30 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h4 className="text-white">Shared History</h4>
            <p className="text-xs text-gray-400">AR memory layer for your crew</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { 
              id: 1, 
              title: 'Epic Brunch Squad',
              location: 'Dishoom Shoreditch', 
              date: '2 weeks ago',
              emoji: '🍽️',
              participants: 6
            },
            { 
              id: 2, 
              title: 'Techno Till Dawn',
              location: 'Fabric Nightclub', 
              date: '1 month ago',
              emoji: '🎵',
              participants: 8
            },
          ].map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-xl p-4 border border-teal-500/30 hover:border-teal-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="text-3xl">{memory.emoji}</div>
                <div className="flex-1">
                  <div className="text-white mb-1">{memory.title}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    {memory.location}
                  </div>
                </div>
                <div className="text-xs text-gray-500">{memory.date}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span className="text-xs text-gray-400">{memory.participants} friends</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg text-xs hover:bg-teal-500/30 transition-all"
                >
                  View in AR
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl p-4 border border-teal-500/40">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-teal-400" />
            <span className="text-white text-sm">AR Memory Layer</span>
          </div>
          <p className="text-xs text-gray-400">
            When your crew returns to a Zone, see ghost reflections from past visits overlaid on your camera. 
            &quot;Remember that time...?&quot; becomes visual.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}