import { Injectable } from '@angular/core';
import { Location, Obstacle } from '../models/location.model';

type Point = [number, number]
interface Line {
  slope: number,
  intercept: number,
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  //breadth first search algorithm to find the shortest path between two points in a grid
  findShortestPath(location: Location, start: Point, end: Point): boolean {
    const grid = this.createObstacleGrid(location);
    const rows = location.height;
    const cols = location.width;
    const directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]];
    const visited: Set<string> = new Set();
    const queue: [Point, number][] = [[start, 0]];

    while (queue.length > 0) {
      const [current, distance] = queue.shift()!;

      if (current[0] === end[0] && current[1] === end[1]) {
          return true;
      }
      for (const [dr, dc] of directions) {
        const r = current[0] + dr;
        const c = current[1] + dc;

        const posStr = `${r},${c}`;
        if (r >= 0 && r < rows && c >= 0 && c < cols && !visited.has(posStr) && grid[r][c] === 0) {
            visited.add(posStr);
            queue.push([[r, c], distance + 1]);
        }
      }
    }
    return false;
  }

  createObstacleGrid(location: Location): number[][] {
    let grid = new Array(location.width);
    for(let j = 0; j < location.width; j++) {
      for(let i = 0; i < location.height; i++) {
        const cellContent = this.pointIsInObstacle({x: j, y: i}, location.obstacles);
        if(cellContent) {
          grid[j][i] = 1; // Obstacle cell
        } else {
          grid[j][i] = 0; // Empty
        }
      }
    }
    return grid;
  }

  pointIsInObstacle(point: { x: number; y: number }, obstacles: Obstacle[]): boolean {
    for (const obstacle of obstacles) {
      if (
        point.x >= obstacle.startingX &&
        point.x < obstacle.startingX + obstacle.width &&
        point.y >= obstacle.startingY &&
        point.y < obstacle.startingY + obstacle.length
      ) {
        return true;
      }
    }
    return false;
  }

  getLineFromTwoPoints(point1: { x: number; y: number }, point2: { x: number; y: number }): Line {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const slope = dy / dx;
    const intercept = point1.y - slope * point1.x;
    return { slope, intercept };
  }


  // distance between a point and a line defined by two points
  // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  distance(start: { x: number, y: number }, end: { x: number, y: number }, point: { x: number, y: number }): number {
    const numerator = Math.abs((end.y - start.y) * point.x - (end.x - start.x) * point.y + end.x * start.y - end.y * start.x);
    const denominator = Math.sqrt(Math.pow(end.y - start.y, 2) + Math.pow(end.x - start.x, 2));
    return numerator / denominator;
  }

  getIsBetweenTwoPoints(start: { x: number; y: number }, end: { x: number; y: number }, point: { x: number; y: number }): boolean {
    const x_lower = Math.min(start.x, end.x);
    const x_upper = Math.max(start.x, end.x);
    const y_lower = Math.min(start.y, end.y);
    const y_upper = Math.max(start.y, end.y);
    const isInBounds = point.x >= x_lower && point.x <= x_upper && point.y >= y_lower && point.y <= y_upper;
    if (!isInBounds) {
      return false; // Point is outside the bounds of the line segment
    }
    const distanceFromLine = this.distance(start, end, point);
    if (distanceFromLine > 1.41) {
      return false;
    } else {
      return true;
    }
  }
}
