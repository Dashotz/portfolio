/**
 * Smoothly scrolls to an element with the given selector
 * @param selector - CSS selector of the element to scroll to
 */
export const scrollToElement = (selector: string): void => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
