// utils/generateCalendarHeatmap.ts
import * as d3 from 'd3';
import { Color } from '@utils/colors';

type Point = { date: Date; value: number };

export function generateCalendarHeatmapSVG(data: Point[]): string {
    const cellSize = 8;
    const width = 31 * cellSize; // Max 31 days in a month
    const height = 12 * cellSize + 40; // 12 months + space for labels

    // Find the latest date in your data
    const lastDate = d3.max(data, d => d.date)!;
    // Get the first day of the month, 11 months before the latest date
    const yearStart = d3.timeMonth.floor(d3.timeMonth.offset(lastDate, -11));

    const color = d3.scaleThreshold<number, string>()
        .domain([19, 39, 100]) // thresholds for PM2.5
        .range([
            Color.GOOD,          // Good (0-19)
            Color.MODERATE,      // Moderate (19-39)
            Color.VERY_UNHEALTHY // Very unhealthy (39-100)
        ]);

    const formatDate = d3.timeFormat('%Y-%m-%d');
    const formatMonth = d3.timeFormat('%b'); // Changed from %B to %b for abbreviated month names

    const svg = d3
        .create('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', width + 120) // Extra space for month labels
        .attr('height', height);

    svg.append('text')
        .attr('x', width / 2) // Centered horizontally
        .attr('y', 8)                // Some padding from the top
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('font-weight', 'bold')
        .attr('fill', '#000')
        .text('past 12 months PM 2.5');

    const chartGroup = svg.append('g').attr('transform', 'translate(20,15)');

    // Create data for each day of each month
    const months = d3.timeMonths(yearStart, d3.timeYear.offset(yearStart, 1));
    const monthData = months.map(month => {
        const daysInMonth = d3.timeDays(
            month,
            d3.timeMonth.offset(month, 1)
        );
        return daysInMonth.map(day => ({
            date: day,
            value: data.find(d => formatDate(d.date) === formatDate(day))?.value || 0
        }));
    });

    // Draw cells for each month
    chartGroup
        .selectAll('g.month')
        .data(monthData)
        .join('g')
        .attr('class', 'month')
        .attr('transform', (_, i) => `translate(0,${i * cellSize})`)
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('width', cellSize - 1)
        .attr('height', cellSize - 1)
        .attr('x', d => (d.date.getDate() - 1) * cellSize)
        .attr('fill', d => d.value === 0 ? Color.NO_DATA : color(d.value))
        .append('title')
        .text(d => `${formatDate(d.date)}: ${d.value}`);

    // Month labels
    chartGroup
        .selectAll('text.month')
        .data(months)
        .join('text')
        .attr('class', 'month')
        .attr('x', -5)
        .attr('y', (_, i) => i * cellSize + cellSize / 2)
        .attr('text-anchor', 'end')
        .attr('font-size', 8)
        .text((d, i) => i % 2 === 0 ? formatMonth(d) : ''); // Show only even months

    return svg.node()?.outerHTML || '';
}
