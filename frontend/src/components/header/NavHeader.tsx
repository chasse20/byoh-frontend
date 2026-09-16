import { useState } from 'react';
import classnames from 'classnames';

import { RoutePath } from 'constants/index';
import { useByohNavigation } from 'hooks/index';
import styles from './NavHeader.module.css';
import closeIcon from 'assets/close-icon-sm.svg';
import byohLogo from 'assets/byoh-color-sm.svg';
import hamburgerMenu from 'assets/hamburger-sm.svg';

export const NavHeader = () => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

	const {
		navigate,
		navigateAndClearSearchParams,
		navigateAndReplaceSearchParams,
	} = useByohNavigation();

	return (
		<>
			<button
				className={styles.navMobileMenuButton}
				onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
			>
				<img src={hamburgerMenu} alt="hamburger menu" width={24} />
			</button>

			{/* Desktop/Tablet Header */}
			<nav className={styles.navHeaderBar}>
				<img src={byohLogo} alt="BYOH logo" className={styles.byoh} />
				<ul>
					<li>
						<a href="https://vanmetrehomes.com/about-van-metre">About</a>
					</li>
					<li>
						<a href="https://vanmetrehomes.com/contact-us">Contact Us</a>
					</li>
				</ul>
			</nav>

			{/* Mobile Header */}
			<div
				className={classnames(styles.scrim, {
					[styles.scrimOpen]: isMobileNavOpen,
				})}
			/>
			<div
				className={classnames(styles.navMobileMenu, {
					[styles.mobileMenuOpen]: isMobileNavOpen,
				})}
			>
				{isMobileNavOpen && (
					<>
						<button
							className={styles.navMobileMenuCloseButton}
							onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
						>
							<img
								src={closeIcon}
								alt="hamburger menu close button"
								width={24}
							/>
						</button>
						<div
							className={classnames(styles.mobileLinks, {
								[styles.mobileLinksOpen]: isMobileNavOpen,
							})}
						>
							<ul>
								<li>
									<a
										href="https://vanmetrehomes.com/about-van-metre"
										onClick={(event) => {
											event.preventDefault();
											setIsMobileNavOpen(false);
											navigate(RoutePath.Lot);
										}}
									>
										Lot
									</a>
								</li>
								<li>
									<a
										href="https://vanmetrehomes.com/about-van-metre"
										onClick={(event) => {
											event.preventDefault();
											setIsMobileNavOpen(false);
											navigate(RoutePath.Exterior, {
												appendSearchParams: { option: 'elevation' },
											});
										}}
									>
										Elevation
									</a>
								</li>
								<li>
									<a
										href="https://vanmetrehomes.com/about-van-metre"
										onClick={(event) => {
											event.preventDefault();
											setIsMobileNavOpen(false);
											navigate(RoutePath.Exterior, {
												appendSearchParams: { option: 'landscaping' },
											});
										}}
									>
										Landscaping
									</a>
								</li>
								<li>
									<a
										href="https://vanmetrehomes.com/about-van-metre"
										onClick={(event) => {
											event.preventDefault();
											setIsMobileNavOpen(false);
											navigate(RoutePath.Exterior, {
												appendSearchParams: { option: 'exterior-color' },
											});
										}}
									>
										Exterior Color
									</a>
								</li>
								<li>
									<a
										href="https://vanmetrehomes.com/about-van-metre"
										onClick={(event) => {
											setIsMobileNavOpen(false);
											event.preventDefault();
											navigateAndClearSearchParams(RoutePath.Plan);
										}}
									>
										Plan
									</a>
								</li>
								<li>
									<a
										href="https://vanmetrehomes.com/about-van-metre"
										onClick={(event) => {
											setIsMobileNavOpen(false);
											event.preventDefault();
											navigate(RoutePath.InteriorDesign);
										}}
									>
										Interior Design
									</a>
								</li>
								<li>
									<a
										href="https://vanmetrehomes.com/about-van-metre"
										onClick={(event) => {
											setIsMobileNavOpen(false);
											event.preventDefault();
											navigateAndReplaceSearchParams(RoutePath.Review, {
												phase: 'review',
											});
										}}
									>
										Review
									</a>
								</li>
							</ul>
							<ul>
								<li>
									<a href="https://vanmetrehomes.com/about-van-metre">About</a>
								</li>
								<li>
									<a href="https://vanmetrehomes.com/contact-us">Contact Us</a>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</>
	);
};
