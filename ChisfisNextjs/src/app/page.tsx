import React from 'react'
import SectionHero1 from './(client-components)/SectionHero1'
import SectionOurFeatures from '@/components/Sections/SectionOurFeatures'
import BackgroundSection from '@/components/Sections/BackgroundSection'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionHowItWork from '@/components/Sections/SectionHowItWork'
import SectionSubscribe from '@/components/Sections/SectionSubscribe'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionBecomeAnAuthor from '@/components/Sections/SectionBecomeAnAuthor'
import SectionClientSay from '@/components/SectionClientSay'

function PageHome() {
	return (
		<main className="nc-PageHome relative overflow-hidden">
			<div className="container relative mb-5 space-y-5 lg:mb-5 lg:space-y-5">
				<SectionHero1 className="pt-0 lg:pb-0 lg:pt-0" />

				<SectionGridFeaturePlaces cardType="card1" />

				<div className="relative py-5">
					<BackgroundSection />
					<SectionHowItWork />
				</div>

				<SectionOurFeatures />

				<div className="relative py-5">
					<BackgroundSection />
					<SectionGridAuthorBox boxCard="box2" />
				</div>

				<SectionBecomeAnAuthor />

				<div className="relative py-5">
					<BackgroundSection />
					<SectionClientSay />
				</div>

				<SectionSubscribe />
			</div>
		</main>
	)
}

export default PageHome
