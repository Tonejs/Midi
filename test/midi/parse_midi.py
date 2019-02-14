# 
# this file is used to generate a ground truth on a midi file
# 

from pretty_midi import * 
import os

# parse the files
def parse_file(filename):
	if os.path.exists('{}.txt'.format(filename)):
		os.remove('{}.txt'.format(filename))
	midi_data = PrettyMIDI(filename)
	with open('{}.txt'.format(filename), 'a') as output:
		for instrument in midi_data.instruments:
			output.write('track {}\n'.format(instrument.name))
			for note in instrument.notes:
				output.write('{}\t{}\t{}\n'.format(note.pitch, note.start, note.end))


# get all of the midi files
for dir in os.listdir('./'):
	if(os.path.isdir(dir)):
		for midifile in os.listdir(dir):
			if midifile.endswith('.mid'):
				parse_file(os.path.join(dir, midifile))
				continue
			else:
				continue

