export function getRandomInt( min: number, max: number ): number {
  let nMin = Math.ceil( min );
  let nMax = Math.ceil( max );

  return Math.floor( Math.random() * ( nMax - nMin ) ) + nMin;
}
