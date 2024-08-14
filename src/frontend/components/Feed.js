import React from 'react';
import { View, FlatList } from 'react-native';
import Tweet from './Tweet/Tweet';


const tweets = [
    {
      user: {
        name: "Alice Johnson",
        username: "alice_j",
      },
      id: '1',
      createdAt: "2024-08-10T14:48:00.000Z",
      tweetLikes: 10,
      content: "Just finished an amazing hike in the mountains! #NatureLover",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",  // Example of an image key
    },
    {
      user: {
        name: "Bob Smith",
        username: "bob_smith",
      },
      id: '2',
      createdAt: "2024-08-11T09:30:00.000Z",
      tweetLikes: 23,
      content: "Excited about the new project we're launching next week 🚀",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      user: {
        name: "Catherine Green",
        username: "cat_green",
      },
      id: '3',
      createdAt: "2024-08-12T12:15:00.000Z",
      tweetLikes: 43,
      content: "Loving the new coffee shop in town. The espresso is top-notch ☕",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      user: {
        name: "David Lee",
        username: "david_lee",
      },
      id: '4',
      createdAt: "2024-08-13T08:22:00.000Z",
      tweetLikes: 54,
      content: "Working on some cool new React features. Stay tuned!",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      user: {
        name: "Emily Davis",
        username: "emily_d",
      },
      id: '5',
      createdAt: "2024-08-14T16:05:00.000Z",
      tweetLikes: 13,
      content: "Had a blast at the concert last night 🎸",
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  ];


const Feed = () => {


  return (
    <View style={{width: '100%', flex: 1}}>
      <FlatList
        data={tweets}
        renderItem={({item}) => <Tweet tweet={item}/>}
        keyExtractor={(item) => item.id}
        
        />
    </View>
  );
};


export default Feed;
