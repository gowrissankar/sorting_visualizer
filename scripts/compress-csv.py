import csv
from collections import defaultdict

input_file = 'performance_data.csv'
output_file = 'compressed.csv'

agg = defaultdict(lambda: [0, 0])  # [total_comparisons, sample_count]

with open(input_file, newline='') as csvfile:
    reader = csv.reader(csvfile)
    next(reader, None)  # Skip header row
    for row in reader:
        algo, size, comps, count = row
        key = (algo, int(size))
        agg[key][0] += int(comps)
        agg[key][1] += int(count)

with open(output_file, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    for (algo, size), (comps, count) in agg.items():
        writer.writerow([algo, size, comps, count])
