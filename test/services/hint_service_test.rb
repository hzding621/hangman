require 'test_helper'

class HintServiceTest < ActiveSupport::TestCase

  def setup
    @service = HintService.instance
  end

  test 'empty word' do
    # initial guess should be equal to the most frequency letter in words of correct length

    assert_equal 'a', @service.find_hint('_' * 4, '')
    assert_equal 'f', @service.find_hint('_' * 5,  '')
  end

  test 'missing one letter' do
    assert_equal 'b', @service.find_hint('a_cd', 'acd')
    assert_equal 'n', @service.find_hint('stude_t', 'stude')
    assert_equal 'e', @service.find_hint('stud_nt', 'studn')
  end

  test 'multiple match take highest frequency' do
    assert_equal 'c', @service.find_hint('ab_____', 'ab') # matches c, z, y, d, g, h, o, p, i, u
    assert_equal 'd', @service.find_hint('st____t', 'st')
  end

  test 'a pattern will highlight all matches' do
    # e.g. 'a_' will never match 'aa'

    assert_equal 'y', @service.find_hint('abc____', 'abc')
    assert_equal 'b', @service.find_hint('a__', 'a') # dict: ['abc', 'aaa']
  end
end
