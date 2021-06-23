import React  from "react";
import {Text, TouchableOpacity, ScrollView} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Help/BadgesHelp.styles"

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <ScrollView contentContainerStyle = {styles.scroll}
            >
            <Text style = {styles.headerText}>
                Badges
            </Text>

            <Text style = {styles.bodyText}>
                Badges are used as a differentiator for users. To rewards users with stellar performances 
                and help newer users find credible sources of information, badges are used to create a 
                tier system.
            </Text>

            <Text style = {styles.subheaderText}>
                Viewing my Badges
            </Text>

            <Text style = {styles.bodyText}>
                You can view your badges by going to Settings -{'>'} Profile.    
            </Text>

            <Text style = {styles.subheaderText}>
                How to earn Badges
            </Text>

            <Text style = {styles.bodyText}>
                Badges are earned by gaining upvotes on posts/comments you create. For example, if I have 
                5 upvotes in total from Channel X which is on Travel, and 11 upvotes in total from Channel 
                Y on the same topic, I will have amassed 16 upvotes for this particular topic.
                {"\n\n"}
                It is important to note that badges are topic-specific.
            </Text>

            <Text style = {styles.subheaderText}>
                Badge Tiers
            </Text>

            <Text style = {styles.bodyText}>
                Currently, these are the badge tiers in descending order, with the topmost being the highest.
                {"\n\n"} 
                Sage: Awarded by the creators to the most exceptional users of P!ng.*
                {"\n\n"} 
                Guru: Awarded to users in the top 10% in a particular topic.^
                {"\n\n"} 
                Thinker: Awarded to users in the top 30% in a particular topic.^
                {"\n\n\n"} 
                Some Rules:{'\n'}
                - You can only have one badge per topic, so once you have upgraded to a higher tier, 
                your previous tier of badge for that topic will be removed.
                {"\n\n"}
                - Once you have attained a certain tier, you will not be downgraded. Great news!
                {"\n\n"}
                <Text style = {styles.italicText}>
                    *Sage badges are awarded based on the discretion of the support team.
                    {"\n\n"} 
                    ^Percentiles are calculated based on a server-side algorithm that refreshes 
                    every few minutes. If you're waiting to see if you've gotten that elusive badge, 
                    do wait a short while for the changes to be confirmed!
                </Text>
            </Text>

            <Text style = {styles.subheaderText}>
                Future updates
            </Text>

            <Text style = {styles.bodyText}>
                Our team will be looking to add more interesting badges to award our ever-growing 
                pool of users! Stay tuned :)
            </Text>
            </ScrollView>
        </Screen>
    )
}